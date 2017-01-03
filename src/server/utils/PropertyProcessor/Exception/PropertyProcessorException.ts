import { ProcessorException } from './ProcessorException';
/**
 * Exception thrown by PropertyProcessor
 */

export class PropertyProcessorException extends ProcessorException {
    constructor(public field: string,
                public type: string,
                public message: string) {
        super();
    }

    getChildrenExceptions(): ProcessorException[] { return []; }
}
