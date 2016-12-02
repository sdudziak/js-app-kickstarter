import { DoubleIdentifierMap } from '../../utils/collection/DoubleIdentifierMap';
import { User } from '../../model/infrastructure/User';

export class SocketSessionIdToUserIdMap {

    protected usersMap: DoubleIdentifierMap<User>;

    public constructor() {
        this.usersMap = new DoubleIdentifierMap<User>();
    }

    public add(socketSessionId: string, user: User): void {
        this.usersMap.add(socketSessionId, user.id.toString(), user);
    }

    public has(socketSessionId: string): boolean {
        return this.usersMap.has(socketSessionId);
    }

    public getBySocketSessionId(socketSessionId: string): User {
        return this.usersMap.getByFirstKey(socketSessionId);
    }

    public getByUserId(userId: string): User {
        return this.usersMap.getBySecondKey(userId);
    }

    remove(socketSessionId: string): void {
        const userToRemove = this.getBySocketSessionId(socketSessionId);
        if (userToRemove) {
            return this.usersMap.remove(socketSessionId, userToRemove.id.toString());
        }
        throw new Error("Trying to remove non existing user");
    }
}
