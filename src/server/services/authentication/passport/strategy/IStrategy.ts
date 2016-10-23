import { User } from '../../../../model/infrastructure/User';

export interface IStrategy {
    name(): string;
    serialize(authority: User, callback: Function): void;
    options(): any;
    strategyHandler(payload: any, next: Function): void
    registerTo(passport: any): void;
}
