import { DoubleIdentifierMap } from '../../utils/collection/DoubleIdentifierMap';
import { User } from '../../model/infrastructure/User';

export class UserIdToSocketSessionIdMap {

    protected usersMap: DoubleIdentifierMap<User>;

    public constructor() {
        this.usersMap = new DoubleIdentifierMap<User>();
    }

    public add(socketSessionId: string, user: User): void {
        this.usersMap.add(socketSessionId, user.id.toString(), user);
    }
}
