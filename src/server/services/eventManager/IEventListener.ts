import { IEvent } from './IEvent';

declare type EventHandler = (event: IEvent) => void;

export interface IEventListener {
    eventType(): string;
    eventName(): string;
    register(eventHandlers: EventHandler[]): void;
    getEventHandlers(): EventHandler[];
}
