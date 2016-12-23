import { ISocketTokenUserIdentifier } from './ISocketTokenUserIdentifier';
import { User } from '../../../../model/infrastructure/User';
import * as passport from 'passport';

export class JwtTokenSocketTokenUserIdentifier implements ISocketTokenUserIdentifier {

    public constructor() {

    }

    public identify(token: string): User {
        throw new Error('gtfo');
    }

}
