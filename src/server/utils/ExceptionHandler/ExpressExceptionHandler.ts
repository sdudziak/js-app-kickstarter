import { IExceptionHandler } from './IExceptionHandler';
import { Request, Response, NextFunction } from 'express';
import { Exception } from '../Exception/Exception';
import TYPES from '../../constant/types';
import { provideSingleton, inject } from '../../ioc/ioc';
import { IExceptionToRequestErrorMapper } from './IExceptionToRequestErrorMapper';

@provideSingleton(TYPES.IExceptionHandler)
export class ExpressExceptionHandler implements IExceptionHandler {

    constructor(@inject(TYPES.IExceptionToRequestErrorMapper) private exceptionToRequestErrorMapper?: IExceptionToRequestErrorMapper) {
    }

    handle(exception: Exception, req: Request, res: Response, next: NextFunction): void {
        const requestError = this.exceptionToRequestErrorMapper.map(exception);
        res.status(requestError.status);
        res.send(requestError);
    }

}
