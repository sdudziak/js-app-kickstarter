import { IEventManagerProvider } from '../IEventManager';
import { IEvent } from '../IEvent';
import { provideNamedSingleton, inject } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import TAGS from '../../../constant/tags';
import { EVENT_TYPES }from '../../../constant/events';
import { IEventListener } from '../IEventListener';

@provideNamedSingleton(TYPES.IEventManagerProvider, TAGS.SocketIOEventManagerProvider)
export class SocketIOEventManager implements IEventManagerProvider {

    protected ioStatic: SocketIO.Server;
    protected _io: SocketIO.Socket;

    public constructor(@inject(TYPES.SocketIO) socketServer: SocketIO.Server) {
        this.ioStatic = socketServer;
    }

    public set io(io: SocketIO.Socket) {
        this._io = io;
    }

    public type(): string {
        return EVENT_TYPES.socket;
    }

    public emit(event: IEvent): void {
        this.ioStatic.emit(event.name(), event.data());
    }

    public on(eventName: string, callback: Function): void {
        // this._io.on(eventName, callback);
    }

    initSocketListeners(socket: SocketIO.Socket, eventListeners: IEventListener[]): void {
        eventListeners
            .filter((eventListener: IEventListener) => eventListener.eventType() === this.type())
            .forEach((eventListener: IEventListener) =>
                eventListener.getEventHandlers()
                    .forEach((eventHandler: Function) => ((eHandler: Function) => {
                            socket.on(eventListener.eventName(), eHandler)
                        })(eventHandler)
                    )
            );
    }
}
