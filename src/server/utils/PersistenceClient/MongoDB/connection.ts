import { Db, MongoClient } from 'mongodb';
import * as config from '../../../config'

    // [config.mongo.login, config.mongo.password].join(':'),
    // '@',
const url: string = [
    'mongodb://',
    config.mongo.host,
    ':', config.mongo.port,
    '/', config.mongo.database
].join('');

export class MongoDBConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection: any) => void) {
        return this.isConnected ?
            result(this.db) :
            this.connect((error: any, db: Db) => {
                if (error) {
                    throw 'DB connection error(' + url + '): ' + error.toString();
                }
                console.log("Connecting to mongo status: " + (this.isConnected ? 'connected' : 'disconnected'));
                return result(this.db);
            });
    }

    private static connect(result: (error: any, db: Db) => void) {
        MongoClient.connect(url, (error: any, db: Db) => {

            this.db = db;
            this.isConnected = true;
            return result(error, db);
        });
    }
}
