import { provideSingleton, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { ISocketIOManager } from './ISocketIOManager';


@provideSingleton(TYPES.ISocketIOManager)
export class SocketIOManager implements ISocketIOManager {

    protected io: SocketIO.Server;

    public constructor(@inject(TYPES.SocketIO) io: SocketIO.Server) {
        this.io = io;
    }

    public init(): void {
        this.io.on('connection', (socket: SocketIO.Server) => {
            socket.emit('news', { hello: 'world from socket manager' });
            socket.on('my other event', function (data: any) {
                console.log(data);
            });
        });
    }

}
