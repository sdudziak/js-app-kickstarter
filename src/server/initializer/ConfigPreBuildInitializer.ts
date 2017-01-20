import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as passport from 'passport';
import { interfaces } from 'inversify-express-utils';
import * as session from 'express-session';

import { inject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';
import * as config from '../config';
import { PreBuildInitializer } from '../services/application/PreBuildInitializer';
import { ILogger } from '../services/logger/ILogger';
import { IExceptionHandler } from '../utils/ExceptionHandler/IExceptionHandler';

@provideSingleton(TYPES.PreBuildInitializer)
export class ConfigPreBuildInitializer implements PreBuildInitializer {

    public constructor(@inject(TYPES.ILogger) private logger: ILogger,
                       @inject(TYPES.IExceptionHandler) private exceptionHandler: IExceptionHandler) {
    }

    public applyTo(server: interfaces.InversifyExpressServer): Promise<void> {
        return new Promise<void>((resolve) => {
            server.setConfig((app: express.Application) => {
                this.logger.log('Initializing passport');
                app.use(passport.initialize());

                this.logger.log('Initializing body-parser');
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json());

                this.logger.log('Initializing helmet');
                app.use(helmet());
                app.use(cookieParser());

                app.use(session({
                    cookie:            { maxAge: 2628000000 },
                    resave:            true,
                    saveUninitialized: true,
                    secret:            config.app.secret
                }));

                const publicPath: string = path.resolve(__dirname, '..', config.path.public);
                this.logger.log('Initializing static paths ' + publicPath);
                app.use('/' + config.path.public, express.static(publicPath));

                this.logger.log('Initializing exception handler');
                app.use(this.exceptionHandler.handle.bind(this.exceptionHandler));
            });
            resolve();
        });
    }

}
