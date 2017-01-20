import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';

import { provideNamed, inject } from '../../ioc/ioc';
import TAGS from '../../constant/tags';
import ROUTES from '../../config/routes';
import TYPES from '../../constant/types';
import { IUserService } from '../../services/user/IUserService';
import { User } from '../../model/infrastructure/User';
import { IAuthenticationService } from '../../services/authentication/IAuthenticationService';
import { Token } from '../../services/authentication/model/Token';
import { ICryptographicService } from '../../services/cryptographic/ICryptographicService';

@provideNamed(TYPE.Controller, TAGS.LoginController)
@Controller(ROUTES.authenticate)
export class LoginController {

    public static ACTION = {
        login:     '/',
        subscribe: '/signup'
    };

    private userService: IUserService;
    private authenticationService: IAuthenticationService;
    private cryptographicService: ICryptographicService;

    public constructor(@inject(TYPES.IUserService) userService: IUserService,
                       @inject(TYPES.IAuthenticationService) authenticationService: IAuthenticationService,
                       @inject(TYPES.ICryptographicService) cryptographicService: ICryptographicService) {

        this.userService = userService;
        this.authenticationService = authenticationService;
        this.cryptographicService = cryptographicService;
    }

    @Post(LoginController.ACTION.login)
    public login(req: express.Request, res: express.Response): void {

        if (!req.body.name || !req.body.password) {
            res.status(400).json({
                message: 'Missing one or both of required fields: name || password'
            });
            return;
        }

        this.userService
            .getUserByName(req.body.name)
            .then((user: User) => {
                if (this.cryptographicService.isPasswordValid(req.body.password, user.passwordHash)) {
                    return user;
                }
                throw new Error('Invalid password');
            })
            .then((user: User) => this.authenticationService.authenticate(user))
            .then((token: Token) => {
                req.session.token = token;
                res.json({ message: 'ok', token: token.toJson() });
            })
            .catch((reason: any) => res.status(401).json({
                details: reason,
                message: 'Cannot log in. Reason: ' + reason.toString()
            }));
    }

    @Post(LoginController.ACTION.subscribe)
    public subscribe(req: express.Request, res: express.Response): void {

        if (!req.body.name || !req.body.password || !req.body.mail) {
            res.status(400).json({
                message: 'Missing one or both of required fields: name | password | mail'
            });
            return;
        }

        const name: string = req.body.name;
        const mail: string = req.body.mail;
        const passwordHash: string = this.cryptographicService.generateHash(req.body.password);

        this.userService
            .getUserByMail(mail)
            .then((user: User | null) => {
                if (user) {
                    throw new Error("User with provided mail already exists");
                }
                return true;
            })
            .then(() => this.userService.getUserByName(name))
            .then((user: User | null) => {
                if (user) {
                    throw new Error("User with provided name already exists");
                }
                return true;
            })
            .then(() => this.userService.newUser(new User(name, mail, passwordHash)))
            .then((user: User) => res.status(200).json({
                message: "User created",
                user:    {
                    id:   user._id,
                    mail: user.mail,
                    name: user.name
                }

            }))
            .catch((reason: Error) => res.status(401).json({
                message: "Cannot create account. Reason: " + reason.toString()
            }));

        // validate input
        // set DDoS protection for this action, to prevent brute-force
    }
}

