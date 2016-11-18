import { provideSingleton, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { IEventManager, IEventManagerProvider } from './IEventManager';
import { IEvent } from './IEvent';


@provideSingleton(TYPES.IEventManager)
export class MultipleProvidersEventManager implements IEventManager {

    protected providers: {[type: string]: IEventManagerProvider} = {};

    public registerProvider(provider: IEventManagerProvider): void {
        if (this.providers[provider.type()]) {
            throw new Error('Event Manager provider already registered');
        }
        this.providers[provider.type()] = provider;
    }

    public emit(event: IEvent): void {
        if (!this.providers[event.type()]) {
            throw new Error('Unknown event type!');
        }
        this.providers[event.type()].emit(event);
    }

    public getRegisteredEventProvider(eventType: string): IEventManagerProvider {
        if (!this.providers[eventType]) {
            throw new Error('Unknown event provider requested.');
        }
        return this.providers[eventType];
    }

    public init(): void {
    }

}
