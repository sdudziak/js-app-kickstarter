import { ISocketTokenUserIdentifier } from './ISocketTokenUserIdentifier';
import { User } from '../../../../model/infrastructure/User';

export class JwtTokenSocketTokenUserIdentifier implements ISocketTokenUserIdentifier {
    public identify(token: string): User {
        return undefined;
    }

}
