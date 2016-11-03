import { Controller, Get, Post, TYPE } from 'inversify-express-utils';
import * as express from 'express';
import * as path from 'path';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import { JWTAuthenticate } from '../middleware/JWTauthenticate';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app)
export class IndexController {

    @Get('/')
    public get(req: express.Request, res: express.Response): void {
        // res.sendFile(path.resolve(__dirname + '/../public/index.html'));
        res.status(200);
        var cache: any = [];
        res.write(JSON.stringify(req, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }));
        res.end();
        cache = null;
    }

    @Post('/abc')
    public abc(req: express.Request): string {
        return 'you need token to access here';
    }
}

