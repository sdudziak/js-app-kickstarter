import { IMultipleTypeEvent } from '../services/eventManager/IEvent';
import { EVENT_NAMES, EVENT_TYPES } from '../constant/events';

export class SocketOnUserConnectedEvent implements IMultipleTypeEvent {

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

    public types(): string[] {
        return [EVENT_TYPES.socket];
    }

}
