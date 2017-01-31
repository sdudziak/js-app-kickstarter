import * as path from 'path';
import * as fs from 'fs';
import { fork, ChildProcess } from 'child_process';
import * as process from 'process';

import { IWorkerManager } from './IWorkerManager';
import { provideSingleton, inject } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import { ILogger } from '../../logger/ILogger';

@provideSingleton(TYPES.IWorkerManager)
export class WorkerManager implements IWorkerManager {

    private workersDir: string;
    private workers: ChildProcess[];

    public constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.workersDir = path.resolve(__dirname, '..', '..', '..', 'worker');
        this.workers    = [];
    }

    public loadWorkers(): Promise<void> {
        return this.getWorkersLocations()
            .then((files: string[]) => files.forEach(this.forkSingleWorker.bind(this)));
    }

    private getWorkersLocations(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            return fs.readdir(this.workersDir, (error: Error, files: string[]) => {
                if (error) return reject(error);
                resolve(files
                    .filter((file: string) => file.match(/\.js$/))
                    .map((file: string) => path.resolve(this.workersDir, file))
                );
            });
        })
    }

    private forkSingleWorker(workerModulePath: string) {
        const worker: ChildProcess = fork(workerModulePath);
        this
            .linkWorkerWithMainProcess(worker)
            .workers.push(worker);
    }

    private linkWorkerWithMainProcess(worker: ChildProcess): this {
        process.on('exit', () => worker.emit('exit'));
        worker.on('exit', () => console.log('Finish my work!'));
        return this;
    }
}
