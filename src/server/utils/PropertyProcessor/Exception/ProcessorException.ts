import { Exception } from '../../Exception/Exception';
/**
 * Exception thrown by PropertyProcessor
 */

export abstract class ProcessorException implements Exception {
    abstract field: string;
    abstract type: string;
    abstract message: string;
    abstract getChildrenExceptions(): ProcessorException[];

    constructor() {
        Object.setPrototypeOf(ProcessorException.prototype, Error.prototype);
    }
}
