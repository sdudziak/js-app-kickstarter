export class SEVERITY {
    static info: string = 'info';
    static warning: string = 'warning';
    static error: string = 'error';
    static debug: string = 'debug';
}

export interface ILogger {
    log(message: string, severity?: string, data?: any): void;
    debug(examined: any): void;
}
