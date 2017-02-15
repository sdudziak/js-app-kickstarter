import * as process from 'process';

import '../ioc/loader';

import { kernel } from '../ioc/ioc';
import TYPES from '../constant/types';
import { ILogger } from '../services/logger/ILogger';

const logger: ILogger = kernel.get<ILogger>(TYPES.ILogger);

process.on('message', (message: string, callback: any) =>
    logger.log(message)
);
