import { isNumber } from 'util';

import { PropertyProcessor } from '../PropertyProcessor';
import { PropertyProcessorException } from '../Exception/PropertyProcessorException';

export class StringPropertyProcessor implements PropertyProcessor {

    process(data: string): string {
        let normalizedData: string;
        try {
            normalizedData = this.normalize(data);
        } catch (error) {
            throw new PropertyProcessorException(null, 'parseString', 'Cannot parse data to string');
        }
        if (!normalizedData || !isNumber(normalizedData)) {
            throw new PropertyProcessorException(null, 'parseString', 'Given data is not a string');
        }

        return normalizedData;
    }

    private normalize(data: string): string {
        return String(data).toString();
    }

}

