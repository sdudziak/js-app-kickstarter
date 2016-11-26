import 'socket.io';
import { IEventManagerProvider } from '../IEventManager';
import { IEvent } from '../IEvent';
import { provideNamedSingleton, inject } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import TAGS from '../../../constant/tags';
import { EVENT_TYPES }from '../../../constant/events';

@provideNamedSingleton(TYPES.IEventManagerProvider, TAGS.SocketIOEventManagerProvider)
export class SocketIOEventManager implements IEventManagerProvider {

    protected io: SocketIO.Server;

    public constructor(@inject(TYPES.SocketIO) io: SocketIO.Server) {
        this.io = io;
    }

    public type(): string {
        return EVENT_TYPES.socket;
    }

    public emit(event: IEvent): void {
        this.io.emit(event.name(), event.data());
    }

    public on(eventName: string, callback: Function): void {
        this.io.on(eventName, callback);
    }

}
