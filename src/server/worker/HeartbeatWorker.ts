import * as process from 'process';

import { IWorker } from '../services/application/WorkerManager/IWorker';
import { inject, provideSingleton } from '../ioc/ioc';
import TYPES from '../constant/types';


@provideSingleton(TYPES.IWorker)
export class HeartbeatWorker implements IWorker {

    public constructor() {
        setInterval(() => console.log('I\'m alive!'), 1000);
        process.on('exit', () => console.log('I quit!'));
    }
}

exports = module.exports = new HeartbeatWorker();
