import * as SocketIO from 'socket.io';

export interface ISocketIOManager {
    registerSocketServer(socketIO: SocketIO.Server): void;
}
