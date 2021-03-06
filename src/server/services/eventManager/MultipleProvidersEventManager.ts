import {provideSingleton, inject} from '../../ioc/ioc';
import TYPES from '../../constant/types';
import {IEventManager, IEventManagerProvider} from './IEventManager';
import {IEvent} from './IEvent';
import forEach = require('lodash/forEach');
import {ILogger, SEVERITY} from '../logger/ILogger';
import {IEventListener, EventHandler} from './IEventListener';

@provideSingleton(TYPES.IEventManager)
export class MultipleProvidersEventManager implements IEventManager {

    protected providers: {[type: string]: IEventManagerProvider} = {};
    protected logger: ILogger;

    public constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger;
    }

    public initProviders(providers: IEventManagerProvider[]): this {
        forEach(providers, this.registerProvider.bind(this));
        return this;
    }

    public registerProvider(provider: IEventManagerProvider): void {
        if (this.providers[provider.type()]) {
            throw new Error('Event Manager provider already registered');
        }
        this.logger.log('Registered "' + provider.type() + '" event manager provider', 'info');
        this.providers[provider.type()] = provider;
    }

    public initListeners(eventListeners: IEventListener[]): this {
        eventListeners.forEach((eventListener: IEventListener) =>
            eventListener.getEventHandlers()
                .forEach((eventHandler: EventHandler) =>
                    this.getRegisteredEventProvider(eventListener.eventType())
                        .on(eventListener.eventName(), eventHandler))
        );
        return this;
    }

    public emit(event: IEvent): void {
        if (!this.providers.hasOwnProperty(event.type())) {
            throw new Error('Invalid event type!');
        }
        this.providers[event.type()].emit(event);
    }

    public getRegisteredEventProvider(eventType: string): IEventManagerProvider {
        if (!this.providers[eventType]) {
            throw new Error('Unknown event provider requested.');
        }
        return this.providers[eventType];
    }
}
