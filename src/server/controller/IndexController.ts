import * as express from 'express';
import * as path from 'path';
import passport = require('passport');

import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import { inject, provideNamed } from '../ioc/ioc';
import { ITemplating } from '../services/templating/ITemplating';
import { ILogger } from '../services/logger/ILogger';
import { NextFunction } from 'express-serve-static-core';
import ROUTES from '../config/routes';
import TAGS from '../constant/tags';
import TYPES from '../constant/types';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app)
export class IndexController {

    public constructor(@inject(TYPES.ITemplating) private templating: ITemplating,
                       @inject(TYPES.ILogger) private logger: ILogger) {
    }

    @Get('/')
    public get(req: express.Request, res: express.Response, next: NextFunction): void {
        passport.authenticate('jwt', ((error: any, user: any, info: any) => {
            if (user) {
                return res.send(this.templating.renderFile('index.pug', {
                    name: user.name
                })).end()
            }
            return res.send(this.templating.renderFile('index-unauthorized.pug')).end()
        }))(req, res, next);
    }

    @Post('/abc')
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

