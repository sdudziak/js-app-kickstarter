import { ProcessorException } from './ProcessorException';
/**
 * Exception thrown by PropertyProcessor
 */

export class ArrayOfProcessorException extends ProcessorException {

    public message: string;
    public type: string = 'propertyError';

    constructor(public field: string,
                message: string,
                public propertyErrors: ProcessorException[]) {
        super();
        this.message = message || `Processing object ${field} failed`;
    }

    getChildrenExceptions() {
        return this.propertyErrors;
    }
}
