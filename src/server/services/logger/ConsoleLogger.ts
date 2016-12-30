import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {

    public debug(examined: any): void {
        console.log(examined);
    }

    public log(message: string, severity?: string, data?: any): void {
        data ? console.log(message, data) : console.log(message);
    }

}
