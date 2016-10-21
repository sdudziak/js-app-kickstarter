import { Db, ObjectID } from 'mongodb';
import { IPersistenceClient } from '../IPersistenceClient';
import { IIdentifiable } from '../../../model/IIdentifable';
import { MongoDBConnection } from './connection';
import TYPES from '../../../constant/types';
import { provide } from '../../../ioc/ioc';

@provide(TYPES.IPersistenceClient)
export class MongoPersistenceClient<T extends IIdentifiable> implements IPersistenceClient<T> {

    protected db: Db;

    constructor() {
        MongoDBConnection.getConnection(connection => this.db = connection);
    }

    public find(collection: string, filter: Object, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .find(filter)
            .toArray((error, find) => {
                return result(error, find);
            });
    }

    public findOneById(collection: string, objectId: ObjectID, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .find({_id: objectId})
            .limit(1)
            .toArray((error, find) => {
                return result(error, find[0]);
            });
    }

    public insert(collection: string, model: T, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .insertOne(model, (error, insert) => {
                return result(error, insert.ops[0]);
            });
    }

    public update(collection: string, objectId: ObjectID, model: T, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .updateOne({_id: objectId}, model, (error, update) => {
                return result(error, model);
            });
    }

    public remove(collection: string, objectId: ObjectID, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .deleteOne({_id: objectId}, (error, remove) => {
                return result(error, remove);
            });
    }

}
