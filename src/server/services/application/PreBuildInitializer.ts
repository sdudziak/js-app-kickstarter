import { interfaces } from 'inversify-express-utils';

export interface PreBuildInitializer {
    applyTo(express: interfaces.InversifyExpressServer): void;
}
