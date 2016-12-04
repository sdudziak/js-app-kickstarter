import { IEvent } from './IEvent';

export declare type EventHandler = (event: IEvent) => void;

export interface IEventListener {
    eventType(): string;
    eventName(): string;
    getEventHandlers(): Function[];
    validate()
}
