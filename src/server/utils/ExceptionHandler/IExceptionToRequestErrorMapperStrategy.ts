import { IExceptionToRequestErrorMapper } from './IExceptionToRequestErrorMapper';

export interface IExceptionToRequestErrorMapperStrategy extends IExceptionToRequestErrorMapper {
    exceptionType(): string;
}
