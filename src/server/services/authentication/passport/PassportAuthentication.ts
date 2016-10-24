import { IAuthenticationService } from '../IAuthenticationService';
import TYPES from '../../../constant/types';
import { provide } from '../../../ioc/ioc';
import ROUTES from '../../../config/routes';
import * as jwt from 'jsonwebtoken';
import * as config from '../../../config/index'
import passport = require('passport');
import { IStrategy } from './strategy/IStrategy';
import { User } from '../../../model/infrastructure/User';
import { Token } from '../model/Token';
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

@provide(TYPES.IAuthenticationService)
export class PassportAuthentication implements IAuthenticationService {

    private passport: any;
    private strategies: {[name: string]: IStrategy};

    public addAuthStrategy(anStrategy: IStrategy) {
        if (this.strategies[anStrategy.name()]) {
            throw new Error('You\'re trying to add ' + anStrategy.name() + ' second time!');
        }

        if (!this.passport) {
            throw new Error('You have to register provider first');
        }
        this.strategies[anStrategy.name()] = anStrategy;
        this.strategies[anStrategy.name()].registerTo(this.passport);
    }

    public setProvider(provider: any): void {
        this.passport = provider;
    }

    public authenticate(user: User, providedPasswordHash: string): Promise<Token> {
        return new Promise((resolve: Function, reject: Function) => {

            if (user.passwordHash !== providedPasswordHash) {
                reject(new Error("password did not match"));
            }

            const payload: { id: string, expireAt: number } = {
                id:       user.id.toHexString(),
                expireAt: Date.now() + config.app.tokenLifetime
            };
            const token = jwt.sign(payload, config.app.secret);

            resolve(new Token(payload, token));
        });
    }

    public isAuthenticated(): Function {
        return ensureLoggedIn(ROUTES.authenticate);
    }

}
