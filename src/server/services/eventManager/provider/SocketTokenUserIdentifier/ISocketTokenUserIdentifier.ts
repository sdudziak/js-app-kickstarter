import { User } from '../../../../model/infrastructure/User';

export interface ISocketTokenUserIdentifier {
    identify(token: string): User;
}
