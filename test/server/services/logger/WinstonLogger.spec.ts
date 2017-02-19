import * as sinon from 'sinon';
import * as winston from 'winston';
import { WinstonLogger } from '../../../../src/server/services/logger/WinstonLogger';


const winstonStub: winston.LoggerInstance = <winston.LoggerInstance> <any> {
    cli: (): any => null,
    log: () => null
};

describe('WinstonLogger', () => {

    const logMessage: string = 'log message';

    let logger: WinstonLogger;

    beforeEach(() => {
        sinon.spy();
    });

    it('will call log method if log is called', () => {
        logger = new WinstonLogger(winstonStub);
        logger.log(logMessage);
    });
});
