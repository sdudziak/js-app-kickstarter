import { IExceptionToRequestErrorMapper } from '../IExceptionToRequestErrorMapper';
import { IRequestError } from '../../Exception/IRequestError';
import { Exception } from '../../Exception/Exception';
import TYPES from '../../../constant/types';
import { multiInject, provideNamedSingleton } from '../../../ioc/ioc';
import NAMES from '../../../constant/tags';
import { IExceptionToRequestErrorMapperStrategy } from '../IExceptionToRequestErrorMapperStrategy';
import { StandardException } from '../../Exception/StandardException';

@provideNamedSingleton(TYPES.IExceptionToRequestErrorMapper, NAMES.ExceptionToRequestMapper.strategyDispatcher)
export class ExceptionToRequestMapperStrategyDispatcher implements IExceptionToRequestErrorMapper {

    private mappers: {[handledExceptionType: string]: IExceptionToRequestErrorMapper};

    public constructor(@multiInject(TYPES.IExceptionToRequestErrorMapperStrategy) mappers: IExceptionToRequestErrorMapperStrategy[]) {
        this.mappers = {};
        mappers.forEach((mapper: IExceptionToRequestErrorMapperStrategy) => this.mappers[mapper.exceptionType()] = mapper);
    }

    map(exception: StandardException): IRequestError {
        const exceptionType = exception.constructor.toString();
        return this.mappers.hasOwnProperty(exceptionType)
            ? this.mappers[exceptionType].map(exception)
            : this.mappers['default'].map(exception);

    }

}
