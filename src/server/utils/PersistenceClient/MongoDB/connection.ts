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

    public static getConnection(): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            if (this.isConnected) {
                return resolve(this.db);
            }
            MongoClient.connect(url, (error: any, db: Db) => {
                console.log([
                    '[Mongo] ',
                    'Attempting connect to db (',
                    url,
                    ') status: ',
                    error ? error.toString() : 'connected',
                ].join(''));

                if (error) {
                    return reject('DB connection error(' + url + '): ' + error.toString());
                }
                this.db = db;
                this.isConnected = true;
                resolve(this.db);
            });
        });
    }
}
