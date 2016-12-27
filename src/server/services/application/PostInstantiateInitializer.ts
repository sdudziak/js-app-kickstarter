import {Server} from 'http'

export interface PostInstantiateInitializer {
    applyTo(server: Server): Promise<void>;
}
