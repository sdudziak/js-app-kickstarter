export interface IEventManagerProvider {
    name(): string;
    emit(event: Event): void;
    on(eventType: string, callback: Function): void;
}
