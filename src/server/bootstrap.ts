import { InversifyExpressServer, interfaces } from 'inversify-express-utils'
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as SocketIO from 'socket.io';

import { kernel } from './ioc/ioc';
import * as config from './config';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import TYPES from './constant/types';
import { IAuthenticationService } from './services/authentication/IAuthenticationService';
import { IStrategy } from './services/authentication/passport/strategy/IStrategy';

// start the server
let server: interfaces.InversifyExpressServer = new InversifyExpressServer(kernel);
let authService: IAuthenticationService = kernel
    .get<IAuthenticationService>(TYPES.IAuthenticationService);
authService.setProvider(passport);
authService.addAuthStrategy(kernel.get<IStrategy>(TYPES.IStrategy));

    server.setConfig((app) => {
        app.use(passport.initialize());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(helmet());
        app.use('/' + config.path.public, express.static(path.resolve(__dirname, config.path.public)));
    });

    let app = server.build();

    let instance: any = app.listen(config.url.port);
    console.log(`Server started on port ${config.url.port} :)`);


    let socketIO = SocketIO.listen(instance);
    socketIO.on('connection', (socket: SocketIO.Server) => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data: any) {
            console.log(data);
        });
    });

    exports = module.exports = app;
