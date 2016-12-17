import { provideSingleton, multiInject } from '../../ioc/ioc';
import TYPES from '../../constant/types';
import { PreBuildInitializer } from './PreBuildInitializer';
import { interfaces } from 'inversify-express-utils';

@provideSingleton(TYPES.ApplicationServer)
export class ApplicationServer {

    private express: interfaces.InversifyExpressServer;
    private preBuildInitializers: PreBuildInitializer[];

    public constructor(@multiInject(TYPES.PreBuildInitializer) preBuildInitializers: PreBuildInitializer[]) {
        this.preBuildInitializers = preBuildInitializers;
    }

    public setExpress(server: interfaces.InversifyExpressServer) {
        this.express = server;
    }

    public run(): void {
        this.initPreBuildInitializers();
    }

    protected initPreBuildInitializers(): void {
        this
            .preBuildInitializers
            .map<void>(
                (initializer: PreBuildInitializer) => initializer.applyTo(this.express)
            );
    }
}
