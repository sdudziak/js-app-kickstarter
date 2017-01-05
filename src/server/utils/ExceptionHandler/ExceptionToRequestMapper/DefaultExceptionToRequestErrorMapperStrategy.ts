import { IExceptionToRequestErrorMapperStrategy } from '../IExceptionToRequestErrorMapperStrategy';
import { IRequestError } from '../../Exception/IRequestError';
import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';
import { StandardException } from '../../Exception/StandardException';

@provideSingleton(TYPES.IExceptionToRequestErrorMapperStrategy)
export class DefaultExceptionToRequestErrorMapperStrategy implements IExceptionToRequestErrorMapperStrategy {
    exceptionType(): string {
        return 'default';
    }

    map(exception: StandardException): IRequestError {
        return <IRequestError> {
            status: 500,
            title: 'Internal server error',
            type: 'default',
            detail: 'Please contact site administrator'
        };
    }

}
