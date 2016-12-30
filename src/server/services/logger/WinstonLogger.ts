import * as winston from 'winston';

import { ILogger } from './ILogger';
import { provide } from '../../ioc/ioc';
import TYPES from '../../constant/types';

@provide(TYPES.ILogger)
export class WinstonLogger implements ILogger {

    private logger: winston.LoggerInstance;

    public constructor() {
        this.logger = new winston.Logger({
            exitOnError: false,
            transports:  [new (winston.transports.Console)({
                colorize:         true,
                handleExceptions: true,
                json:             false,
                level:            'info',
                prettyPrint:      true,
                timestamp:        true
            })]
        });
        this.logger.cli();
    }

    public log(message: string, severity?: winston.CLILoggingLevel, data?: any): void {
        this.logger.log(severity || 'info', message, data);
    }

    public debug(examined: any): void {
        this.logger.debug(examined);
    }
}
