import { User } from '../../model/infrastructure/User';
import { Token } from './model/Token';

export interface IAuthenticationService {
    isAuthenticated(): Function;
    setProvider(provider: any): void
    authenticate(user: User): Promise<Token>;
}
