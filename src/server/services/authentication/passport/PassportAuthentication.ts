import { IAuthenticationService } from '../IAuthenticationService';
import TYPES from '../../../constant/types';
import { provide } from '../../../ioc/ioc';
import ROUTES from '../../../config/routes';
import { Handler } from 'express-serve-static-core';
import passport = require('passport');
import { IStrategy } from './strategy/IStrategy';
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

@provide(TYPES.IAuthenticationService)
export class PassportAuthentication implements IAuthenticationService {

    private passport: any;
    private strategies: {[name: string]: IStrategy};

    private addAuthStrategy(anStrategy: IStrategy) {
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

    public authenticate(strategy: string, configuration: any, callback: Function = null): Handler {
        return this.passport.authenticate(strategy, configuration, callback);
    }

    public isAuthenticated(): Function {
        return ensureLoggedIn(ROUTES.authenticate);
    }

}
