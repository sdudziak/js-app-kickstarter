import { inject, provide } from '../../ioc/ioc';
import { ILogger } from './ILogger';
import { LIBRARIES } from '../../constant/libraries';
import TYPES from '../../constant/types';
import * as winston from 'winston';

@provide(TYPES.ILogger)
export class WinstonLogger implements ILogger {

    private logger: winston.LoggerInstance;

    public constructor(@inject(LIBRARIES.winston) winston: winston.LoggerInstance) {
        this.logger = winston;
        this.logger.cli();
    }

    public log(message: string, severity?: winston.CLILoggingLevel, data?: any): void {
        this.logger.log(severity || 'info', message, data);
    }

    public debug(examined: any): void {
        this.logger.debug(examined);
    }

    public error(message: string, data?: any): void {
        this.logger.error(message, data);
    }
}
