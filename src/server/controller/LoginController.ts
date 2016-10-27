import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';

import { provideNamed, inject } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import { csrfProtection } from '../middleware/csrfProtection';
import TYPES from '../constant/types';
import { IUserService } from '../services/user/IUserService';
import { User } from '../model/infrastructure/User';
import { IAuthenticationService } from '../services/authentication/IAuthenticationService';
import { Token } from '../services/authentication/model/Token';

@provideNamed(TYPE.Controller, TAGS.LoginController)
@Controller(ROUTES.authenticate, csrfProtection)
export class LoginController {

    public static ACTION = {
        subscribe: '/subscribe',
        login:     '/'
    };

    private userService: IUserService;
    private authenticationService: IAuthenticationService;

    public constructor(@inject(TYPES.IUserService) userService: IUserService,
                       @inject(TYPES.IAuthenticationService) authenticationService: IAuthenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @Post(LoginController.ACTION.login)
    public login(req: express.Request, res: express.Response): void {

        if (!req.body.name || !req.body.password) {
            res.status(400).json({
                message: "Missing one or both of required fields: name || password"
            });
            return;
        }

        const name: string = req.body.name;
        const passwordHash: string = this.userService.generateHash(req.body.password);

        this.userService
            .getUserByName(name)
            .then((user: User) => this.authenticationService.authenticate(user, passwordHash))
            .then((token: Token) => res.json({ message: "ok", token: token.toJson() }))
            .catch((reason) => res.status(401).json({ message: "Cannot log in. Reason: " + reason.toString() }));
    }

    @Post(LoginController.ACTION.subscribe, csrfProtection)
    public subscribe(req: express.Request, res: express.Response): void {

        const name: string = req.body.name;
        const mail: string = req.body.mail;
        const passwordHash: string = this.userService.generateHash(req.body.password);

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
            .then(()=> {
                let user: User = new User(name, mail, passwordHash);
                return this.userService.newUser(user);
            })
            .then((user: User) => res.status(200).json({
                message: "User created",
                user:    {
                    id:   user.id,
                    name: user.name,
                    mail: user.mail
                }

            }))
            .catch((reason: Error) => res.status(401).json({
                message: "Cannot create account. Reason: " + reason.toString()
            }));

        // validate input
        // check if there is any user for given name.
        // create new user with provided data;
        // return info so user can proceed and log in.
        // set DDoS protection for this action, to prevent brute-force
    }
}

