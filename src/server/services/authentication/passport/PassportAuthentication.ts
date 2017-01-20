import passport = require('passport');
import  * as _  from 'lodash';
import { IAuthenticationService } from '../IAuthenticationService';
import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';
import ROUTES from '../../../config/routes';
import { IStrategy } from './strategy/IStrategy';
import { User } from '../../../model/infrastructure/User';
import { Token } from '../model/Token';

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

@provideSingleton(TYPES.IAuthenticationService)
export class PassportAuthentication implements IAuthenticationService {

    private passport: any;
    private strategies: { [name: string]: IStrategy } = {};

    public addAuthStrategy(anStrategy: IStrategy): void {
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

    public authenticate(user: User): Promise<Token> {
        return new Promise((resolve: Function, reject: Function) => {
            let errors: { [strategyName: string]: any } = [];
            let errorsCounter: number = 0;
            let strategiesCount: Number = Object
                .keys(this.strategies)
                .map(key => this.strategies.hasOwnProperty(key))
                .length;

            for (const strategyName in this.strategies) {
                if (!this.strategies.hasOwnProperty(strategyName)) continue;
                const strategy: IStrategy = this.strategies[strategyName];
                strategy
                    .authenticate(user)
                    .then((token: Token) => resolve(token))
                    .catch((reason: any) => {
                        errors[strategyName] = reason;
                        if (++errorsCounter === strategiesCount) {
                            reject(errors);
                        }
                    });
            }
        });
    }

    public isAuthenticated(): Function {
        return ensureLoggedIn(ROUTES.authenticate);
    }

}
