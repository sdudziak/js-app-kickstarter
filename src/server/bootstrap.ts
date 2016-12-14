import { interfaces, InversifyExpressServer } from 'inversify-express-utils'
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as io from 'socket.io';
import * as jwt from 'jsonwebtoken';

import { kernel } from './ioc/ioc';
import * as config from './config';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import TYPES from './constant/types';
import { IAuthenticationService } from './services/authentication/IAuthenticationService';
import { IStrategy } from './services/authentication/passport/strategy/IStrategy';
import { IEventManager, IEventManagerProvider } from './services/eventManager/IEventManager';
import { IEventListener } from './services/eventManager/IEventListener';
import { EVENT_TYPES } from './constant/events';
import { SocketIOEventManager } from './services/eventManager/provider/SocketIOEventManager';

// start the server
let server: interfaces.InversifyExpressServer = new InversifyExpressServer(kernel);
let authService: IAuthenticationService = kernel
    .get<IAuthenticationService>(TYPES.IAuthenticationService);
authService.setProvider(passport);
authService.addAuthStrategy(kernel.get<IStrategy>(TYPES.IStrategy));

server.setConfig((app: express.Application) => {
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use('/' + config.path.public, express.static(path.resolve(__dirname, config.path.public)));
});

let app = server.build();

const instance: any = app.listen(config.url.port);
console.log(`Server started on port ${config.url.port}`);

const socketIO: SocketIO.Server = io.listen(instance);
kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);

socketIO.use((socket, next): void => {
    if (!socket.handshake.query.token) {
        socket.disconnect(true);
    }
    // const result = jwt.decode(socket.handshake.query.token);
    const result = jwt.verify(socket.handshake.query.token.split(' ')[1], config.app.secret);
    if (!result) {
        next(new Error('Invalid token'));
        socket.disconnect(true);

    }
    socket['user_id'] = result.id;
    next();
});

const eventManager: IEventManager = kernel.get<IEventManager>(TYPES.IEventManager);
eventManager.initProviders(kernel.getAll<IEventManagerProvider>(TYPES.IEventManagerProvider));
eventManager.initListeners(kernel.getAll<IEventListener>(TYPES.IEventListener));

socketIO.on("connection", function (socket: SocketIO.Socket) {
    const socketManager: SocketIOEventManager = <SocketIOEventManager> eventManager.getRegisteredEventProvider(EVENT_TYPES.socket);
    socketManager.initSocketListeners(socket, kernel.getAll<IEventListener>(TYPES.IEventListener));
});

socketIO.sockets.on('connection', function (socket): void {

});
exports = module.exports = app;
