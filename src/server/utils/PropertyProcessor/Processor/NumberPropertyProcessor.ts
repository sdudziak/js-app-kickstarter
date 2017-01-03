import { isNumber } from 'util';

import { PropertyProcessor } from '../PropertyProcessor';
import { PropertyProcessorException } from '../Exception/PropertyProcessorException';

export class NumberPropertyProcessor implements PropertyProcessor {

    process(data: string): number {
        let normalizedData: number;
        try {
            normalizedData = this.normalize(data);
        } catch (error) {
            throw new PropertyProcessorException(null, 'parseNumber', 'Cannot parse data to number');
        }
        if (!normalizedData || !isNumber(normalizedData)) {
            throw new PropertyProcessorException(null, 'parseNumber', 'Given ID is not a number');
        }

        return normalizedData;
    }

    private normalize(data: string): number {
        return Number(data);
    }

}

