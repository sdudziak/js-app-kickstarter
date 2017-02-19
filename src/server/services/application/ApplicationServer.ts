import * as express from 'express';
import * as http from 'http'
import * as io from 'socket.io';

import { provideSingleton, multiInject, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { PreBuildInitializer } from './PreBuildInitializer';
import { interfaces } from 'inversify-express-utils';
import { interfaces as inversifyInterfaces } from 'inversify';
import * as config from '../../config';
import { ILogger, SEVERITY } from '../logger/ILogger';
import { IPostInstantiateInitializer } from './IPostInstantiateInitializer';

@provideSingleton(TYPES.ApplicationServer)
export class ApplicationServer {


    private express: interfaces.InversifyExpressServer;
    private preBuildInitializers: PreBuildInitializer[];
    private postInstantiateInitializers: IPostInstantiateInitializer[];
    private expressRequestHandler: express.Application;
    private server: http.Server;
    private logger: ILogger;

    public constructor(@multiInject(TYPES.PreBuildInitializer) preBuildInitializers: PreBuildInitializer[],
                       @inject(TYPES.ILogger) logger: ILogger) {
        this.preBuildInitializers = preBuildInitializers;
        this.logger = logger;
    }

    public setExpress(server: interfaces.InversifyExpressServer) {
        this.express = server;
    }

    public run(kernel: inversifyInterfaces.Kernel): void {
        this.initPreBuildInitializers(this.express)
            .then(() => this.instantiate(kernel))
            .then(() => {
                this.postInstantiateInitializers = kernel.getAll<IPostInstantiateInitializer>(TYPES.IPostInstantiateInitializer);
            })
            .then(() => this.initPostInstantiateInitializers())
            .catch((reason: Error) => this.logger.log(reason.message, "error", reason));
    }

    public getServer(): http.Server {
        return this.server;
    }

    protected instantiate(kernel: inversifyInterfaces.Kernel): Promise<void> {
        return new Promise<void>((resolve) => {
            this.expressRequestHandler = this.express.build();
            const port: number = config.url.port;
            this.server = this
                .expressRequestHandler
                .listen(port, () => this.logger.log(`Server started at port: ${port}`));
            const socketIO: SocketIO.Server = io(this.getServer());
            kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);

            resolve();
        });
    }

    protected initPreBuildInitializers(express: interfaces.InversifyExpressServer): Promise<void[]> {
        return Promise.all(
            this
                .preBuildInitializers
                .map((initializer: PreBuildInitializer) => initializer.applyTo(express))
        );
    }

    protected initPostInstantiateInitializers(): Promise<void[]> {
        return Promise.all(
            this
                .postInstantiateInitializers
                .map((initializer: IPostInstantiateInitializer) => initializer.applyTo(this.server))
        );
    }
}
