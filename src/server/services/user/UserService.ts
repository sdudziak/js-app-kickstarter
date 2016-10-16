import { IUserService } from './IUserService';
import * as bcrypt from 'bcrypt-nodejs';
import { User } from '../../model/infrastructure/User';
import { IPersistenceClient } from '../../utils/PersistenceClient/IPersistenceClient';
import TYPES from '../../constant/types';

import { provide, inject } from '../../ioc/ioc';

@provide(TYPES.UserService)
export class UserService implements IUserService {

    private static COLLECTION_NAME = 'user';

    constructor(@inject(TYPES.IPersistenceClient) private mongo: IPersistenceClient<User>) {

    }

    public generateHash(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    public isUserPasswordValid(password: string, user: User): boolean {
        return bcrypt.compareSync(password, user.passwordHash);
    }

    public getUsers(filter: any = {}, limit: number = 10, skip: number = 0): Promise<User[]> {
        filter['$skip']  = skip;
        filter['$limit'] = limit;
        return new Promise<User[]>((resolve, reject) => {
            this.mongo.find(UserService.COLLECTION_NAME, filter, (error: Error, data: User[]) => {
                error ? reject(error) : resolve(data);
            });
        });
    }

    public getUserByMail(mail: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.mongo.find(UserService.COLLECTION_NAME, {
                       mail,
                limit: 1
            }, (error: Error, data: User) => {
                error ? reject(error) : resolve(data);
            });
        });
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
