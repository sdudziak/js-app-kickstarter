import { interfaces, InversifyExpressServer } from 'inversify-express-utils'
import * as io from 'socket.io';
import { kernel } from './ioc/ioc';
import * as config from './config';
// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import TYPES from './constant/types';
import { IEventManager, IEventManagerProvider } from './services/eventManager/IEventManager';
import { IEventListener } from './services/eventManager/IEventListener';
import { EVENT_TYPES } from './constant/events';
import { SocketIOEventManager } from './services/eventManager/provider/SocketIOEventManager';
import { NextFunction } from 'express-serve-static-core';
import { ApplicationServer } from './services/application/ApplicationServer';

// start the server
let server: interfaces.InversifyExpressServer = new InversifyExpressServer(kernel);

const applicationServer: ApplicationServer
          = kernel.get<ApplicationServer>(TYPES.ApplicationServer);

applicationServer.setExpress(server);

const socketIO: SocketIO.Server = io.listen(applicationServer.getServer());
kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);

applicationServer.run(kernel);

// const eventManager: IEventManager = kernel.get<IEventManager>(TYPES.IEventManager);
// eventManager.initProviders(kernel.getAll<IEventManagerProvider>(TYPES.IEventManagerProvider));
// eventManager.initListeners(kernel.getAll<IEventListener>(TYPES.IEventListener));
//
// socketIO.on("connection", function (socket: SocketIO.Socket) {
//     const socketManager: SocketIOEventManager = <SocketIOEventManager> eventManager.getRegisteredEventProvider(EVENT_TYPES.socket);
//     socketManager.initSocketListeners(socket, kernel.getAll<IEventListener>(TYPES.IEventListener));
// });
//
// socketIO.sockets.on('connection', function (socket): void {
//
// });
exports = module.exports = applicationServer.getServer();
