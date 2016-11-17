import { InversifyExpressServer, interfaces } from 'inversify-express-utils'
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as io from 'socket.io';

import { kernel } from './ioc/ioc';
import * as config from './config';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import TYPES from './constant/types';
import { IAuthenticationService } from './services/authentication/IAuthenticationService';
import { IStrategy } from './services/authentication/passport/strategy/IStrategy';
import { IEventManager } from './services/eventManager/IEventManager';

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

const instance: any = app.listen(config.url.port);
console.log(`Server started on port ${config.url.port} :)`);


const socketIO: SocketIO.Server = io.listen(instance);
kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);

const EventManager: IEventManager = kernel.get<IEventManager>(TYPES.IEventManager);
EventManager.init();

exports = module.exports = app;
