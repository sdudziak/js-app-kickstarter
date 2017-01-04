// controllers
import '../controller/IndexController';
import '../controller/UserController';
import '../controller/LoginController';

// services
import '../services/application/ApplicationServer';
import '../services/authentication/passport/PassportAuthentication';
import '../services/cryptographic/Cryptographic';
import '../services/eventManager/provider/SocketConnectedUsers/SocketConnectedUsers';
import '../services/logger/WinstonLogger';
import '../services/templating/HandlebarsTemplating'
import '../services/user/UserService';

import '../initializer/AuthenticationPreBuildInitializer';
import '../initializer/ConfigPreBuildInitializer';
import '../initializer/TemplatingInitializer';
import '../initializer/EvenManagerInitializer'
import '../initializer/SocketIOAuthenticationPostInstantiateInitializer';

// events
import '../services/eventManager/MultipleProvidersEventManager';
import '../services/eventManager/provider/SocketIOEventManager';

// eventListeners
import '../event/listener/SocketOnUserConnectedEventListener';

// authentication strategies
import '../services/authentication/passport/strategy/JWTStrategy';

// utils
import '../utils/PersistenceClient/MongoDB/MongoPersistenceClient';
import '../utils/ExceptionHandler/ExpressExceptionHandler';
// Application
