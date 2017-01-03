import { PropertyProcessor } from '../PropertyProcessor';
import { PropertyDefinition } from '../PropertyDefinition';
import { PropertyProcessorException } from '../Exception/PropertyProcessorException';
import { ObjectProcessorException } from '../Exception/ObjectProcessorException';
import { ProcessorException } from '../Exception/ProcessorException';

export class ObjectProcessor implements PropertyProcessor {

    constructor(private propertyDefinitions: PropertyDefinition[]) {
    }

    process(data: {[propertyName: string]: any}): Object {
        const processedData: {[propertyName: string]: any} = {};
        const errors: ProcessorException[]                 = [];

        for (let propertyDefinition of this.propertyDefinitions) {
            if (propertyDefinition.required && !data.hasOwnProperty(propertyDefinition.name)) {
                errors.push(
                    new PropertyProcessorException(propertyDefinition.name, 'required', 'This field is required')
                );
                continue;
            }

            if (data.hasOwnProperty(propertyDefinition.name)) {
                try {
                    processedData[propertyDefinition.name] = propertyDefinition.processor.process(data[propertyDefinition.name]);
                } catch (error) {
                    if (error instanceof ProcessorException) {
                        error.field = propertyDefinition.name;
                        errors.push(error);
                    } else {
                        // if the error is unknown bubble it up.
                        throw error;
                    }
                }
            }
        }

        if (errors.length) {
            throw new ObjectProcessorException(null, errors);
        }

        return processedData;
    }
}
