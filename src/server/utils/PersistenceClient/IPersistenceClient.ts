import { IIdentifiable } from '../../model/IIdentifable';
import { ObjectID } from 'mongodb';

export interface IPersistenceClient<T extends IIdentifiable> {
    find(collection: string, filter: Object, result: (error: any, data: any) => void): void;
    findOneById(collection: string, objectId: ObjectID, result: (error: any, data: any) => void): void;
    insert(collection: string, model: T, result: (error: any, data: any) => void): void;
    update(collection: string, objectId: ObjectID, model: T, result: (error: any, data: any) => void): void
    remove(collection: string, objectId: ObjectID, result: (error: any, data: any) => void): void
}
