import { IMultipleTypes, IType } from './IEventManager';

export interface IEvent extends IType {
    name(): string;
    data(): any | null;
}

export interface IMultipleTypeEvent extends IMultipleTypes {
    name(): string;
    data(): any | null;
}
