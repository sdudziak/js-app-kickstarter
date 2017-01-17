import * as express from 'express';
import passport = require('passport');

import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import { inject, provideNamed } from '../ioc/ioc';
import { ITemplating } from '../services/templating/ITemplating';
import { ILogger } from '../services/logger/ILogger';
import { NextFunction } from 'express-serve-static-core';
import ROUTES from '../config/routes';
import TAGS from '../constant/tags';
import TYPES from '../constant/types';
import { CONFIG } from '../config/templating';

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
                res.send(this.templating.render(CONFIG.templates.index, {
                    name: user.name
                })).end();
            } else {
                res.send(this.templating.render(CONFIG.templates.indexUnauthorized)).end();
            }
            next();
        }))(req, res, next);
    }

    @Post('/home')
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

