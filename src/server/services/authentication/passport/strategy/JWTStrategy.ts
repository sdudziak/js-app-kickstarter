import passport = require('passport');
import { ExtractJwt, Strategy as PassportJwtStrategy } from "passport-jwt";


import { IStrategy } from './IStrategy';
import { User } from '../../../../model/infrastructure/User'
import TYPES from '../../../../constant/types';
import { IUserService } from '../../../user/IUserService';
import { provide, kernel } from '../../../../ioc/ioc'
import * as config from '../../../../config/index';

@provide(TYPES.IStrategy)
export class JwtStrategy implements IStrategy {

    private _options: any;
    private strategy: PassportJwtStrategy;

    public constructor() {
        this._options = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey:    config.app.secret
        };
    }

    public name(): string {
        return 'jwt';
    }

    public options(): any {
        return this._options;
    }

    public serialize(user: User, done: Function): void {
        done(null, user.id.toString());
    }

    public strategyHandler(payload: { id: string, expireAt: number }, next: Function): void {
        if (payload.expireAt < Date.now()) {
            return next(null, false);
        }
        const userService = kernel.get<IUserService>(TYPES.IUserService);
        var user = userService.getUserById(payload.id);
        user ? next(null, user) : next(null, false);
    }

    public registerTo(passport: any): void {
        this.strategy = new PassportJwtStrategy(this.options(), this.strategyHandler);
        passport.use(this.name(), this.strategy);
    }
}
