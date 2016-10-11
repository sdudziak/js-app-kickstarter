import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import { csrfProtection } from '../middleware/csrfProtection';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app, csrfProtection)
export class IndexController {

    @Get('/')
    public get(req: express.Request): string {
        return 'Home sweet home ' + req.csrfToken();
    }

    @Post('/abc', csrfProtection)
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

