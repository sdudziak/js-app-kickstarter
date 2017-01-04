import { interfaces } from 'inversify-express-utils';

import { inject, provideSingleton } from '../ioc/ioc';
import { PreBuildInitializer } from '../services/application/PreBuildInitializer';
import TYPES from '../constant/types';
import { IInitializable } from '../services/application/IInitializable';
import { ILogger } from '../services/logger/ILogger';

@provideSingleton(TYPES.PreBuildInitializer)
export class TemplatingInitializer implements PreBuildInitializer {

    public constructor(@inject(TYPES.ITemplating) private templating: IInitializable,
                       @inject(TYPES.ILogger) private logger: ILogger) {
    }

    applyTo(express: interfaces.InversifyExpressServer): Promise<void> {
        this.logger.log('Initalizing templating engine');
        return new Promise<void>((resolve) => resolve(this.templating.init()));
    }

}
