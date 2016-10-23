import { User } from '../../model/infrastructure/User';

export interface IUserService {
    generateHash(password: string): string;
    isUserPasswordValid(password: string, user: User): boolean;
    getUsers(filter: any, limit: number, skip: number): Promise<User[]>
    getUserByMail(mail: string): Promise<User>
    getUserById(id: string): Promise<User>
    newUser(user: User): Promise<User>
    updateUser(user: User): Promise<User>
    deleteUser(user: User): Promise<any>
}
