import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';

export interface IEventManager extends IEventEmitter {
    init(providers: IEventManagerProvider[]): void;
    initListeners(eventListeners: IEventListener[]): void;
    registerProvider(provider: IEventManagerProvider): void;
    getRegisteredEventProvider(eventType: string): IEventManagerProvider;
}


export interface IEventEmitter {
    emit(event: IEvent): void;
}

export interface IEventRegistrar {
    on(eventName: string, callback: Function): void;
}

export interface IType {
    type(): string;
}

export interface IEventManagerProvider extends IType, IEventEmitter, IEventRegistrar {
}

