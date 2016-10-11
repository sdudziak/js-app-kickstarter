import { AuthenticationServiceInterface } from './AuthenticationServiceInterface';
import TYPES from '../../constant/types';
import { provide } from '../../ioc/ioc';

@provide(TYPES.AuthenticationServiceInterface)
export class BasicTokenAuthentication implements AuthenticationServiceInterface {

    public isAuthenticated(): boolean {
        return true;
    }

}
