import { User } from '../../model/infrastructure/User';
import { Token } from './model/Token';
import { IStrategy } from './passport/strategy/IStrategy';

export interface IAuthenticationService {
    isAuthenticated(): Function;
    setProvider(provider: any): void
    authenticate(user: User): Promise<Token>;
    addAuthStrategy(anStrategy: IStrategy): void;
}
