import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import { csrfProtection } from '../middleware/csrfProtection';

@provideNamed(TYPE.Controller, TAGS.LoginController)
@Controller(ROUTES.authenticate, csrfProtection)
export class LoginController {

    public static ACTION = {
        signup: '/signup',
        login:  '/'
    };

    @Get(LoginController.ACTION.login)
    public login(req: express.Request): string {
        return 'Home sweet home ' + req.csrfToken();
    }

    @Post(LoginController.ACTION.signup, csrfProtection)
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

