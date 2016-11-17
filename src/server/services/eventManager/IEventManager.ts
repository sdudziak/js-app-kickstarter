import { IEventManagerProvider } from './IEventManagerProvider';

export interface IEventManager extends IEventManagerProvider {
    init(): void;
    registerProvider(provider: IEventManagerProvider): void;
}
