import { Exception } from './Exception';

export class StandardException implements Exception {
    constructor(public message: string) {
        Object.setPrototypeOf(StandardException.prototype, Error.prototype);
    }
}
