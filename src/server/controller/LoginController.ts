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
        signup: '/signup',
        login:  '/'
    };

    private userService: IUserService;
    private authenticationService: IAuthenticationService;

    public constructor(@inject(TYPES.IUserService) userService: IUserService,
                       @inject(TYPES.IAuthenticationService) authenticationService: IAuthenticationService) {
        this.userService           = userService;
        this.authenticationService = authenticationService;
    }

    @Get(LoginController.ACTION.login)
    public login(req: express.Request, res: express.Response): void {

        if (!req.body.name || !req.body.password) {
            res.status(400).json({
                message: "Missing one or both of required fields: name || password"
            });
            return;
        }

        const name: string         = req.body.name;
        const passwordHash: string = this.userService.generateHash(req.body.password);

        this.userService
            .getUserByName(name)
            .then((user: User) => this.authenticationService.authenticate(user, passwordHash))
            .then((token: Token) => res.json({ message: "ok", token: token.toJson() }))
            .catch((reason) => res.status(401).json({ message: "Cannot log in. Reason: " + reason.toString() }));
    }

    @Post(LoginController.ACTION.signup, csrfProtection)
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

