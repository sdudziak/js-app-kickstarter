import { IEvent } from '../services/eventManager/IEvent';
import { EVENT_NAMES, EVENT_TYPES } from '../constant/events';

export class SocketOnUserConnectedEvent implements IEvent {

    private _data: any = {};

    public constructor(userName: string) {
        this._data.name = userName;
    }

    public name(): string {
        return EVENT_NAMES.socketOnUserConnected;
    }

    public data(): any {
        return this._data;
    }

    public type(): string {
        return EVENT_TYPES.socket;
    }
}
