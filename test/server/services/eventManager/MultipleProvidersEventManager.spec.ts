import { ILogger } from 'src/server/services/logger/ILogger';

describe('MultipleProvidersEventManager', () => {

    const loggerMock: ILogger = <ILogger> {};
    loggerMock.log            = jest.fn();

});
