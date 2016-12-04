import { User } from '../../../../model/infrastructure/User';

export interface ISocketConnectedUsers {
    attachSocketSessionToUser(user: User, socketSession: SocketIO.Socket): void;
    detachUserFromSocketSession(socketSession: SocketIO.Socket, user: User): void;
    getUserBySocketSessionId(anSocketSessionId: string): User;
    getUserSocketSessions(user: User): SocketIO.Socket[];
}
