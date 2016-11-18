import { IType } from './IEventManager';

export interface IEvent extends IType {
    name(): string;
    data(): any | null;
}
