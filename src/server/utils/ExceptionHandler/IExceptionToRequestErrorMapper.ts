import { IRequestError } from '../Exception/IRequestError';
import { StandardException } from '../Exception/StandardException';

export interface IExceptionToRequestErrorMapper {
    map(exception: StandardException): IRequestError;
}
