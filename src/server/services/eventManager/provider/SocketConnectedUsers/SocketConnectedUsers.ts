import { provideSingleton } from '../../../../ioc/ioc';
import { ISocketConnectedUsers } from './ISocketConnectedUsers';
import TYPES from '../../../../constant/types';

@provideSingleton(TYPES.ISocketConnectedUsers)
export class SocketConnectedUsers implements ISocketConnectedUsers {

}
