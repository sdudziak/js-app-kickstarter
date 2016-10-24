import passport = require('passport');
import { ExtractJwt, Strategy as PassportJwtStrategy } from "passport-jwt";


import { IStrategy } from './IStrategy';
import { User } from '../../../../model/infrastructure/User'
import TYPES from '../../../../constant/types';
import { IUserService } from '../../../user/IUserService';
import { inject } from '../../../../ioc/ioc'
import * as config from '../../../../config/index';

export class JwtStrategy implements IStrategy {

    private _options: any;
    private userService: IUserService;
    private strategy: PassportJwtStrategy;

    public constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
        this._options    = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey:    config.app.secret
        };
    }

    public name(): string {
        return 'local-signup';
    }

    public options(): any {
        return this._options;
    }

    public serialize(user: User, done: Function): void {
        done(null, user.id.toString());
    }

    public strategyHandler(payload: any, next: Function): void {
        console.log('payload received', payload);
        var user = this.userService.getUserById(payload.id);
        user ? next(null, user) : next(null, false);
    }

    public registerTo(passport: any): void {
        this.strategy = new PassportJwtStrategy(this.options(), this.strategyHandler);
        passport.use(this.name(), this.strategy);
    }
}
