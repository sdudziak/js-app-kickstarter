// controllers
import '../controller/IndexController';
import '../controller/UserController';
import '../controller/LoginController';

// services
import '../services/authentication/passport/PassportAuthentication';
import '../services/user/UserService';
import '../services/cryptographic/Cryptographic';
import '../services/logger/ConsoleLogger';
import '../services/eventManager/provider/SocketConnectedUsers/SocketConnectedUsers'

// events
import '../services/eventManager/MultipleProvidersEventManager';
import '../services/eventManager/provider/SocketIOEventManager';

// eventListeners
import '../event/listener/SocketOnUserConnectedEventListener';

// authentication strategies
import '../services/authentication/passport/strategy/JWTStrategy';

// utils
import '../utils/PersistenceClient/MongoDB/MongoPersistenceClient';
