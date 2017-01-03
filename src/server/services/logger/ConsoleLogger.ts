import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {

    error(message: string, data?: any): void {
        console.log('[Error] ' + message, data);
    }

    public debug(examined: any): void {
        console.log(examined);
    }

    public log(message: string, severity?: string, data?: any): void {
        data ? console.log(message, data) : console.log(message);
    }

}
