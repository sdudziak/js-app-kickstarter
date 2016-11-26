import { IEventListener } from '../../services/eventManager/IEventListener';
import { provideNamed } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { EVENT_NAMES, EVENT_TYPES } from '../../constant/events';
import { IEvent } from '../../services/eventManager/IEvent';

@provideNamed(TYPES.IEventListener, EVENT_NAMES.socketOnUserConnected)
export class SocketOnUserConnectedEventListener implements IEventListener {

    public eventType(): string {
        return EVENT_TYPES.socket;
    }

    public eventName(): string {
        return EVENT_NAMES.socketOnUserConnected;
    }

    public getEventHandlers(): Function[] {
        return [
            (event: IEvent) => console.log({ event }),
        ];
    }

}
