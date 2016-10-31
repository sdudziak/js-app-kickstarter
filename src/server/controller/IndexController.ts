import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app)
export class IndexController {

    @Get('/')
    public get(req: express.Request): string {
        return 'Home sweet home ' + req.csrfToken();
    }

    @Post('/abc')
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

