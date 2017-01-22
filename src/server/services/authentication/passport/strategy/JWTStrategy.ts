import passport = require('passport');
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as PassportJwtStrategy } from "passport-jwt";


import { IStrategy } from './IStrategy';
import { User } from '../../../../model/infrastructure/User'
import TYPES from '../../../../constant/types';
import { IUserService } from '../../../user/IUserService';
import { provide, kernel } from '../../../../ioc/ioc'
import * as config from '../../../../config/index';
import { Token } from '../../model/Token';

interface ICookieRequest extends Express.Request {
    cookies: any;
}

@provide(TYPES.IStrategy)
export class JwtStrategy implements IStrategy {

    private _options: any;
    private strategy: PassportJwtStrategy;

    public constructor() {
        this._options = {
            jwtFromRequest:    this.fromExtractors([
                this.fromCookie('token'),
                this.fromSession('token'),
                ExtractJwt.fromAuthHeader(),
            ]),
            passReqToCallback: true,
            secretOrKey:       config.app.secret
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

    public authenticate(user: User): Promise<Token> {
        return new Promise((resolve: Function) => {
            const payload: { id: string, expireAt: number } = {
                expireAt: Date.now() + config.app.tokenLifetime,
                id:       user._id.toHexString()
            };
            const token = jwt.sign(payload, config.app.secret);

            resolve(new Token(payload, token));
        });
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

    private fromExtractors(extractors: Function[]) {

        return (request: Express.Request) => {
            let token: string | null = null;
            let index: number = 0;
            while (!token && index < extractors.length) {
                token = extractors[index++].call(this, request);
            }
            return token;
        }
    };

    private fromSession(fieldName: string) {
        return (request: Express.Request) => request.session[fieldName] ? request.session[fieldName].toString() : null
    }

    private fromCookie(fieldName: string) {
        return (request: ICookieRequest) => request.cookies[fieldName] ? request.cookies[fieldName] : null
    }
}
