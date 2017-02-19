import {Server} from 'http'

export interface IPostInstantiateInitializer {
    applyTo(server: Server): Promise<void>;
}
