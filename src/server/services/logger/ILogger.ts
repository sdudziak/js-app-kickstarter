export const SEVERITY = {
    info:    'info',
    warning: 'warning',
    error:   'error',
    debug:   'debug'
};

export interface ILogger {
    log(message: string, severity?: "info" | "warning" | "error" | "debug", data?: any): void;
    debug(examined: any): void;
}
