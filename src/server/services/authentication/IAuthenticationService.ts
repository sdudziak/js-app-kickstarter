import { Handler } from 'express-serve-static-core';

export interface IAuthenticationService {
    isAuthenticated(): Function;
    setProvider(provider: any): void
    authenticate(strategy: string, configuration: any, callback: Function): Handler;
}
