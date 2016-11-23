import { ILogger } from './ILogger';
import { provideSingleton } from '../../ioc/ioc';
import TYPES from '../../constant/types';

@provideSingleton(TYPES.ILogger)
export class ConsoleLogger implements ILogger {

    public debug(examined: any): void {
        console.log(examined);
    }

    public log(message: string, severity?: string, data?: any): void {
        data ? console.log(message, data) : console.log(message);
    }

}
