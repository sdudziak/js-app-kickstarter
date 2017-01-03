import { PropertyProcessor } from '../PropertyProcessor';
import { PropertyDefinition } from '../PropertyDefinition';
import { PropertyProcessorException } from '../Exception/PropertyProcessorException';
import { ProcessorException } from '../Exception/ProcessorException';
import { ArrayOfProcessorException } from '../Exception/ArrayOfProcessorException';

export class ObjectProcessor implements PropertyProcessor {

    constructor(private availableElements: PropertyProcessor[],
                private propertyDefinition: PropertyDefinition) {
    }

    process(data: any[]): any[] {

        const result: any[] = [];
        for (let singleElement of data) {
            const singleProcessResult: any = this.parseSingleEntry(singleElement);
            if (singleProcessResult) {
                result.push(singleProcessResult);
            }
        }

        if (this.propertyDefinition.required && result.length === 0) {
            new PropertyProcessorException(
                this.propertyDefinition.name,
                'required',
                'Array must contain at least one element'
            );
        }

        return result;
    }

    private parseSingleEntry(singleElement: any): any {
        let errors: PropertyProcessorException[] = [];
        for (let availableElement of this.availableElements) {
            try {
                return availableElement.process(singleElement)
            } catch (error) {
                if (error instanceof ProcessorException) {
                    errors.push(error);
                } else {
                    throw error;
                }
            }
        }

        throw new ArrayOfProcessorException(
            this.propertyDefinition.name,
            'Cannot match any of the given elements definitions',
            errors
        );
    }
}
