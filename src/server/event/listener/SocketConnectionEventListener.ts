import { IEventListener, EventHandler } from '../../services/eventManager/IEventListener';
import { provideNamed, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { EVENT_NAMES, EVENT_TYPES } from '../../constant/events';
import { IEventManager } from '../../services/eventManager/IEventManager';
import { SocketOnUserConnectedEvent } from '../SocketOnUserConnectedEvent';

@provideNamed(TYPES.IEventListener, EVENT_NAMES.socketOnUserConnected)
export class SocketConnectionEventListener implements IEventListener {

    private eventManager: IEventManager;

    public constructor(@inject(TYPES.IEventManager) eventManager: IEventManager) {
        this.eventManager = eventManager;
    };

    public eventType(): string {
        return EVENT_TYPES.socket;
    }

    public eventName(): string {
        return EVENT_NAMES.socketConnection;
    }

    public getEventHandlers(): Function[] {
        return [
            () => this.eventManager.emit(new SocketOnUserConnectedEvent('Szymon')),
        ];
    }

}
