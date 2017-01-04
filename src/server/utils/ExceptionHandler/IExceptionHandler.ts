import { Request, Response, NextFunction } from 'express';
import { Exception } from '../Exception/Exception';

export interface IExceptionHandler {
    handle(exception: Exception, req: Request, res: Response, next: NextFunction): void;
}
