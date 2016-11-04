import passport = require('passport');
import * as express from 'express';
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
            jwtFromRequest:    ExtractJwt.fromAuthHeader(),
            secretOrKey:       config.app.secret,
            passReqToCallback: true
        };
    }

    public name(): string {
        return 'jwt';
    }

    public options(): any {
        return this._options;
    }

    public serialize(user: User, done: Function): void {
        done(null, user._id.toString());
    }

    public deserialize(id: string, done: Function) {
        const userService = kernel.get<IUserService>(TYPES.IUserService);
        userService.getUserById(id)
            .then((user: User) => done(null, user))
            .catch((reason: any) => done(reason, null));
    }

    public strategyHandler(req: Express.Request, payload: { id: string, expireAt: number }, next: Function): void {
        if (payload.expireAt < Date.now()) {
            return next(null, false);
        }
        const userService = kernel.get<IUserService>(TYPES.IUserService);
        userService
            .getUserById(payload.id)
            .then((user: User) => {
                req.user = user;
                next(null, user);
            })
            .catch((reason) => next(null, false));
    }

    public registerTo(passport: any): void {
        this.strategy = new PassportJwtStrategy(this.options(), this.strategyHandler.bind(this));
        passport.serializeUser(this.serialize);
        passport.deserializeUser(this.deserialize);
        passport.use(this.name(), this.strategy);
    }
}
