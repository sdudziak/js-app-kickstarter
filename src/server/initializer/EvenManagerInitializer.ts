import { Server } from 'http'

import { inject, multiInject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';
import { EVENT_TYPES } from '../constant/events';
import { PostInstantiateInitializer } from '../services/application/PostInstantiateInitializer';
import { IEventManager, IEventManagerProvider } from '../services/eventManager/IEventManager';
import { IEventListener } from '../services/eventManager/IEventListener';
import { ILogger } from '../services/logger/ILogger';
import { SocketIOEventManager } from '../services/eventManager/provider/SocketIOEventManager';

@provideSingleton(TYPES.PostInstantiateInitializer)
export class EvenManagerInitializer implements PostInstantiateInitializer {

    private eventManager: IEventManager;
    private socketIO: SocketIO.Server;
    private eventProviders: IEventManagerProvider[];
    private eventListeners: IEventListener[];
    private logger: ILogger;

    public constructor(@inject(TYPES.IEventManager) eventManager: IEventManager,
                       @inject(TYPES.SocketIO) socketIO: SocketIO.Server,
                       @multiInject(TYPES.IEventManagerProvider) eventProviders: IEventManagerProvider[],
                       @multiInject(TYPES.IEventListener) eventListeners: IEventListener[],
                       @inject(TYPES.ILogger) logger: ILogger) {

        this.eventManager = eventManager;
        this.socketIO = socketIO;
        this.eventProviders = eventProviders;
        this.eventListeners = eventListeners;
        this.logger = logger;
    }

    public applyTo(server: Server): Promise<void> {
        return new Promise<void>((resolve) => {
            this.logger.log('Initializing EventManager');
            this.eventManager.initProviders(this.eventProviders);
            this.eventManager.initListeners(this.eventListeners);
            const _this = this;
            this.socketIO.on('connection', function (socket: SocketIO.Socket) {
                (<SocketIOEventManager> _this.eventManager.getRegisteredEventProvider(EVENT_TYPES.socket))
                    .initSocketListeners(socket, _this.eventListeners);
            });
            resolve();
        })
    }

}
