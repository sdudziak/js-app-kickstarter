import { IAuthenticationService } from './IAuthenticationService';
import TYPES from '../../constant/types';
import { provide } from '../../ioc/ioc';

@provide(TYPES.IAuthenticationService)
export class BasicTokenAuthentication implements IAuthenticationService {

    public isAuthenticated(): boolean {
        return true;
    }

}
