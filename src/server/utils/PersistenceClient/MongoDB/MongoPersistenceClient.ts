import { Db, ObjectID } from 'mongodb';
import { IPersistenceClient } from '../IPersistenceClient';
import { IIdentifiable } from '../../../model/IIdentifable';
import { MongoDBConnection } from './connection';
import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';

@provideSingleton(TYPES.IPersistenceClient)
export class MongoPersistenceClient<T extends IIdentifiable> implements IPersistenceClient<T> {

    private db: Db;

    constructor() {
        this.obtainConnection();
    }

    private obtainConnection() {
        return MongoDBConnection
            .getConnection()
            .then((connection: Db) => this.db = connection)
            .catch((reason) => {
                throw new Error(reason);
            });
    }

    public find(collection: string, filter: Object, result: (error: any, data: any)=>void): void {
        return this
            .db
            .collection(collection)
            .find(filter)
            .toArray((error, find) => result(error, find));
    }

    public findOneById(collection: string, objectId: ObjectID, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .find({ _id: objectId })
            .limit(1)
            .toArray((error, find) => result(error, find[0]));
    }

    public findOne(collection: string, filter: Object, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .find(filter)
            .limit(1)
            .toArray((error, find) => result(error, find[0]));
    }

    public insert(collection: string, model: T, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .insertOne(model, (error, insert) => result(error, insert.ops[0]));
    }

    public update(collection: string, objectId: ObjectID, model: T, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .updateOne({ _id: objectId }, model, (error, update) => result(error, model));
    }

    public remove(collection: string, objectId: ObjectID, result: (error: any, data: any)=>void): void {
        this
            .db
            .collection(collection)
            .deleteOne({ _id: objectId }, (error, remove) => result(error, remove));
    }

}
