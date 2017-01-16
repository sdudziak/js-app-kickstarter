export interface ITemplatingHelper {
    helperName(): string;
    helperMethod<Result>(context?: any): Result;
}
