import { IIdentifable } from '../../model/IIdentifable';

export interface IPersistenceClient<T extends IIdentifable> {
    find(collection: string, filter: Object, result: (error: any, data: any) => void): void;
    findOneById(collection: string, objectId: string, result: (error: any, data: any) => void): void;
    insert(collection: string, model: T, result: (error: any, data: any) => void): void;
    update(collection: string, objectId: string, model: T, result: (error: any, data: any) => void): void
    remove(collection: string, objectId: string, result: (error: any, data: any) => void): void
}
