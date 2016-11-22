import { IEvent } from './IEvent';

export interface IEventManager extends IEventEmitter {
    init(providers: IEventManagerProvider[]): void;
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

