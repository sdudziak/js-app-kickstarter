import * as path from 'path';
import * as fs from 'fs';

import { IWorkerManager } from './IWorkerManager';
import { provideSingleton, inject } from '../../../ioc/ioc';
import TYPES from '../../../constant/types';
import { ILogger } from '../../logger/ILogger';

@provideSingleton(TYPES.IWorkerManager)
export class WorkerManager implements IWorkerManager {

    private workersDir: string;

    public constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.workersDir = path.resolve(__dirname, '..', '..', '..', 'worker');
    }

    public loadWorkers(): Promise<void> {
        this.logger.log(`Loading workers from ${this.workersDir}`);
        return new Promise((resolve, reject) => {
            return fs.readdir(this.workersDir, (error: Error, files: string[]) => {
                if (error) return reject(error);
                files
                    .filter((file: string) => file.match(/\.js$/))
                    .map((file: string) => path.resolve(file))
                    .forEach((absolutePath: string) => this.logger.log(absolutePath));
                resolve();
            });
        });
    }
}
