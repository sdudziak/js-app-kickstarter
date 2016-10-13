import { Db, MongoClient } from 'mongodb';
import * as config from '../../../config'

const url: string = [
    'mongodb://', config.mongo.host,
    ':', config.mongo.port,
    '/', config.mongo.database
].join('');

export class MongoDBConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection: any) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error: any, db: Db) => {
                return result(this.db);
            });
        }
    }

    private static connect(result: (error: any, db: Db) => void) {
        MongoClient.connect(url, (error: any, db: Db) => {
            this.db          = db;
            this.isConnected = true;

            return result(error, db);
        });
    }
}
