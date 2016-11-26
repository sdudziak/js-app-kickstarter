import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as path from 'path';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import passport = require('passport');
import * as express from 'express';
import { NextFunction } from 'express-serve-static-core';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app)
export class IndexController {

    @Get('/')
    public get(req: express.Request, res: express.Response, next: NextFunction): void {
        passport.authenticate('jwt', ((error: any, user: any, info: any) => {
            // render this views, not only cache; + translations
            user
                ?
                res
                    .header({ 'X-User': JSON.stringify({ id: user._id }) })
                    .sendFile(path.resolve(__dirname + '/../public/index-authorized.html'))
                : res.sendFile(path.resolve(__dirname + '/../public/index.html'));
        }))(req, res, next);
    }

    @Post('/abc')
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

