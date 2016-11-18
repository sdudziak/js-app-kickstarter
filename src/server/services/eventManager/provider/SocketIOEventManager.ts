import { IEventManagerProvider } from '../IEventManager';
import { IEvent } from '../IEvent';
import { provideNamedSingleton, inject } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import TAGS from '../../../constant/tags';
import EVENT_TYPES from '../../../constant/events';

@provideNamedSingleton(TYPES.IEventManagerProvider, TAGS.SocketIOEventManagerProvider)
export class SocketIOEventManager implements IEventManagerProvider {

    protected io: SocketIO.Server;

    private static CONNECTION: string = 'connection';

    public constructor(@inject(TYPES.SocketIO) io: SocketIO.Server) {
        this.io = io;
    }

    public type(): string {
        return EVENT_TYPES.socket;
    }

    public emit(event: IEvent): void {
    }

    public on(eventName: string, callback: Function): void {
        this.io.on('connection', (socket: SocketIO.Server) => {
            socket.emit('news', { hello: 'world from socket manager' });
            socket.on('my other event', function (data: any) {
                console.log(data);
            });
        });
    }

    private connected(): Promise<SocketIO.Server> {
        return new Promise((resolve, reject) =>
            this.io.on(SocketIOEventManager.CONNECTION, ((socket: SocketIO.Server) =>
                    socket ? resolve(socket) : reject()
            )));
    }

}
