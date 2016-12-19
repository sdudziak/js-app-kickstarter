import { Server } from 'http';
import * as jwt from 'jsonwebtoken';
import { PostInstantiateInitializer } from '../PostInstantiateInitializer';
import { inject, provideSingleton } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import { ILogger } from '../../logger/ILogger';
import { NextFunction } from 'express-serve-static-core';
import config = require('../../../config/index');

@provideSingleton(TYPES.PostInstantiateInitializer)
export class SocketIOAuthenticationPostInstantiateInitializer implements PostInstantiateInitializer {

    private logger: ILogger;
    private socketIO: SocketIO.Server;

    public constructor(@inject(TYPES.SocketIO) socketIO: SocketIO.Server, @inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger;
        this.socketIO = socketIO;
    }


    public applyTo(server: Server): void {
        this.logger.log('Initializing SocketIO Authentication');
        this.socketIO.use((socket: any, next: NextFunction) => {
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

    }

}
