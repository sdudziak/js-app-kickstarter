import * as express from 'express';
import * as http from 'http'
import * as io from 'socket.io';

import { provideSingleton, multiInject, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { PreBuildInitializer } from './PreBuildInitializer';
import { interfaces } from 'inversify-express-utils';
import { interfaces as inversifyInterfaces } from 'inversify';
import * as config from '../../config';
import { ILogger } from '../logger/ILogger';
import { PostInstantiateInitializer } from './PostInstantiateInitializer';

@provideSingleton(TYPES.ApplicationServer)
export class ApplicationServer {


    private express: interfaces.InversifyExpressServer;
    private preBuildInitializers: PreBuildInitializer[];
    private postInstantiateInitializers: PostInstantiateInitializer[];
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
        this.initPreBuildInitializers();
        this.instantiate(kernel);
        this.postInstantiateInitializers = kernel.getAll<PostInstantiateInitializer>(TYPES.PostInstantiateInitializer);
        this.initPostInstantiateInitializers();
    }

    public getServer(): http.Server {
        return this.server;
    }

    protected instantiate(kernel: inversifyInterfaces.Kernel): void {
        this.expressRequestHandler = this.express.build();

        const port: number = config.url.port;
        this.server = this
            .expressRequestHandler
            .listen(port, () => this.logger.log(`Server started at port: ${port}`));

        const socketIO: SocketIO.Server = io(this.getServer());
        kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);
    }

    protected initPreBuildInitializers(): void {
        this
            .preBuildInitializers
            .map<void>((initializer: PreBuildInitializer) => initializer.applyTo(this.express));
    }

    protected initPostInstantiateInitializers(): void {
        this
            .postInstantiateInitializers
            .map<void>((initializer: PostInstantiateInitializer) => initializer.applyTo(this.server));
    }
}
