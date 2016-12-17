import { interfaces } from 'inversify-express-utils';
import * as passport from 'passport';

import { PreBuildInitializer } from '../PreBuildInitializer';
import { inject, multiInject, provideSingleton } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import { ILogger } from '../../logger/ILogger';
import { IAuthenticationService } from '../../authentication/IAuthenticationService';
import { IStrategy } from '../../authentication/passport/strategy/IStrategy';

@provideSingleton(TYPES.PreBuildInitializer)
export class AuthenticationPreBuildInitializer implements PreBuildInitializer {

    private logger: ILogger;
    private authenticationService: IAuthenticationService;
    private authenticationStrategies: IStrategy[];

    public constructor(@inject(TYPES.ILogger) logger: ILogger,
                       @inject(TYPES.IAuthenticationService) authenticationService: IAuthenticationService,
                       @multiInject(TYPES.IStrategy) authenticationStrategies: IStrategy[]) {
        this.logger = logger;
        this.authenticationService = authenticationService;
        this.authenticationStrategies = authenticationStrategies;
    }

    public applyTo(express: interfaces.InversifyExpressServer): void {
        this.logger.log('Applying passport to Authentication service');
        this.authenticationService.setProvider(passport);

        this.authenticationStrategies.map<void>((strategy: IStrategy) => {
            this.logger.log(`Applying ${strategy.name()} strategy to Authentication service`);
            this.authenticationService.addAuthStrategy(strategy);
        });
    }
}
