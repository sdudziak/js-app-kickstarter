import { IPostInstantiateInitializer } from '../services/application/IPostInstantiateInitializer';
import { Server } from 'http';
import { inject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';
import { ILogger } from '../services/logger/ILogger';
import { IWorkerManager } from '../services/application/WorkerManager/IWorkerManager';

@provideSingleton(TYPES.IPostInstantiateInitializer)
export class WorkerManagerInitializer implements IPostInstantiateInitializer {

    private logger: ILogger;
    private workerManager: IWorkerManager;

    public constructor(@inject(TYPES.IWorkerManager) workerManager: IWorkerManager,
                       @inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger;
        this.workerManager = workerManager;
    }

    public applyTo(server: Server): Promise<void> {
        this.logger.log('[Initializer] Initializing Workers Manager');
        return this.workerManager.loadWorkers();
    }
}
