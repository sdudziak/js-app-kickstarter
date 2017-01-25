import { IWorker } from '../services/application/WorkerManager/IWorker';
import { inject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';

@provideSingleton(TYPES.IWorker)
export class HeartbeatWorker implements IWorker {

}
