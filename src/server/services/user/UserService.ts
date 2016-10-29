import { ObjectID } from 'mongodb';

import { IPersistenceClient } from '../../utils/PersistenceClient/IPersistenceClient';
import { IUserService } from './IUserService';
import TYPES from '../../constant/types';
import { User } from '../../model/infrastructure/User';
import { provide, inject } from '../../ioc/ioc';

@provide(TYPES.IUserService)
export class UserService implements IUserService {

    private static COLLECTION_NAME = 'users';

    constructor(@inject(TYPES.IPersistenceClient) private mongo: IPersistenceClient<User>) {
    }

    public getUsers(filter: any = {}, limit: number = 10, skip: number = 0): Promise<User[]> {
        filter['$skip'] = skip;
        filter['$limit'] = limit;
        return new Promise<User[]>((resolve, reject) =>
            this.mongo.find(UserService.COLLECTION_NAME, filter, (error: Error, data: User[]) =>
                error ? reject(error) : resolve(data)
            )
        );
    }

    public getUserById(id: string): Promise<User> {
        return new Promise<User>((resolve, reject) =>
            this.mongo.findOneById(UserService.COLLECTION_NAME, new ObjectID(id), (error: Error, data: User) =>
                error ? reject(error) : resolve(data)
            )
        );
    }

    public getUserByMail(mail: string): Promise<User> {
        return new Promise<User>((resolve, reject) =>
            this.mongo.findOne(
                UserService.COLLECTION_NAME,
                { mail },
                (error: Error, data: User) => {
                    error ? reject(error) : resolve(data);
                })
        );
    }

    public getUserByName(name: string): Promise<User> {
        return new Promise<User>((resolve, reject) =>
            this.mongo.findOne(
                UserService.COLLECTION_NAME,
                { name },
                (error: Error, data: User) => {
                    error ? reject(error) : resolve(data);
                })
        );
    }

    public newUser(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.mongo.insert(UserService.COLLECTION_NAME, user.toPersistenceNative, (error: Error, data: User) => {
                error ? reject(error) : resolve(data);
            });
        });
    }

    public updateUser(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.mongo.update(UserService.COLLECTION_NAME, user.id, user.toPersistenceNative, (error: Error, data: User) => {
                error ? reject(error) : resolve(data);
            });
        });
    }

    public deleteUser(user: User): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.mongo.remove(UserService.COLLECTION_NAME, user.id, (error: Error, data: any) => {
                error ? reject(error) : resolve(data);
            });
        });
    }
}
