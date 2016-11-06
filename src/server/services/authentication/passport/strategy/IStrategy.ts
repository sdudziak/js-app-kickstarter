import { User } from '../../../../model/infrastructure/User';
import { Token } from '../../model/Token';

export interface IStrategy {
    name(): string;
    options(): any;
    strategyHandler(req: Express.Request, payload: any, next: Function): void
    registerTo(passport: any): void;
    authenticate(user: User): Promise<Token>
}
