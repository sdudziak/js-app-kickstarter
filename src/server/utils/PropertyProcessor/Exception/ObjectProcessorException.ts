import { ProcessorException } from './ProcessorException';
/**
 * Exception thrown by PropertyProcessor
 */

export class ObjectProcessorException extends ProcessorException {
    public message: string;
    public type: string = 'propertyError';

    constructor(public field: string,
                public propertyErrors: ProcessorException[]) {
        super();
        this.message = `Processing object ${field} failed`;
    }

    getChildrenExceptions() { return this.propertyErrors; }
}
