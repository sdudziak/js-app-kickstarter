import { provideSingleton, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { IEventManager } from './IEventManager';
import { IEventManagerProvider } from './IEventManagerProvider';


@provideSingleton(TYPES.IEventManager)
export class EventManager implements IEventManager {

    protected providers: {[type: string]: IEventManagerProvider} = {};

    public name(): string {
        return 'EventManager';
    }

    public registerProvider(provider: IEventManagerProvider): void {
        if (this.providers[provider.name()]) {
            throw new Error('Event Manager provider already registered');
        }
        this.providers[provider.name()] = provider;
    }

    public emit(event: Event): void {
    }

    public on(eventType: string, callback: Function): void {
    }

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
