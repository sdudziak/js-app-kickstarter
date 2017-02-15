import { expect } from 'chai';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { WinstonLogger } from '../../../../src/server/services/logger/WinstonLogger';

describe('WinstonLogger', () => {

    const logMessage: string = 'log message';
    const loggerInstanceStub = <winston.LoggerInstance> {};

    let winstonMock: sinon.SinonMock;
    let spy: sinon.SinonSpy;
    let logger: WinstonLogger;

    beforeEach(() => {
        spy = sinon.spy();
        winstonMock = sinon.mock(loggerInstanceStub);
        logger = new WinstonLogger((<winston.LoggerInstance> <any> winstonMock));
    });

    it('will call log method if log is called', () => {
        winstonMock.expects('log').once();
        logger.log(logMessage);
        winstonMock.verify();
    });
});
