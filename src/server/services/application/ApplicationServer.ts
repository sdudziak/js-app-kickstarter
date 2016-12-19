import * as express from 'express';
import {Server} from 'http'

import { provideSingleton, multiInject, inject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { PreBuildInitializer } from './PreBuildInitializer';
import { interfaces } from 'inversify-express-utils';
import {interfaces as inversifyInterfaces} from 'inversify';
import * as config from '../../config';
import { ILogger } from '../logger/ILogger';
import { PostInstantiateInitializer } from './PostInstantiateInitializer';

@provideSingleton(TYPES.ApplicationServer)
export class ApplicationServer {


    private express: interfaces.InversifyExpressServer;
    private preBuildInitializers: PreBuildInitializer[];
    private postInstantiateInitializers: PostInstantiateInitializer[];
    private instance: express.Application;
    private application: Server;
    private logger: ILogger;

    public constructor(
        @multiInject(TYPES.PreBuildInitializer) preBuildInitializers: PreBuildInitializer[],
        @inject(TYPES.ILogger) logger: ILogger
    ) {
        this.preBuildInitializers = preBuildInitializers;
        this.logger = logger;
    }

    public setExpress(server: interfaces.InversifyExpressServer) {
        this.express = server;
    }

    public run(kernel: inversifyInterfaces.Kernel): void {
        this.initPreBuildInitializers();
        this.instantiate();
        this.postInstantiateInitializers = kernel.getAll<PostInstantiateInitializer>(TYPES.PostInstantiateInitializer);
        this.initPostInstantiateInitializers();
    }

    public getServer(): Server {
        return this.application;
    }

    protected instantiate(): void {
        this.instance = this.express.build();
        const port:number = config.url.port;
        this.application = this.instance.listen(port, () => this.logger.log(`Server started at port: ${port}`));
    }

    protected initPreBuildInitializers(): void {
        this
            .preBuildInitializers
            .map<void>((initializer: PreBuildInitializer) => initializer.applyTo(this.express));
    }

    protected initPostInstantiateInitializers(): void {
        this
            .postInstantiateInitializers
            .map<void>((initializer: PostInstantiateInitializer) => initializer.applyTo(this.application));
    }
}
