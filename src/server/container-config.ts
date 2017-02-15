import { LIBRARIES } from './constant/libraries';
import { kernel } from './ioc/ioc';

import * as winston from 'winston';

kernel.bind<winston.LoggerInstance>(LIBRARIES.winston).toConstantValue((() =>
    new winston.Logger({
        exitOnError: false,
        transports:  [new (winston.transports.Console)({
            colorize:         true,
            handleExceptions: true,
            json:             false,
            level:            'info',
            prettyPrint:      true,
            timestamp:        true
        })]
    }))()
);
