import { PostInstantiateInitializer } from '../services/application/PostInstantiateInitializer';
import { Server } from 'http';
import { inject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';
import { ILogger } from '../services/logger/ILogger';
import { IWorkerManager } from '../services/application/WorkerManager/IWorkerManager';

@provideSingleton(TYPES.PostInstantiateInitializer)
export class WorkerManagerInitializer implements PostInstantiateInitializer {

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
