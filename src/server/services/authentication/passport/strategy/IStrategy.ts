export interface IStrategy {
    name(): string;
    options(): any;
    strategyHandler(req: Express.Request, payload: any, next: Function): void
    registerTo(passport: any): void;
}
