import { PropertyProcessor } from './PropertyProcessor';

export interface PropertyDefinition {
    name: string;
    required: boolean;
    processor: PropertyProcessor;
}
