// controllers
import '../controller/IndexController';
import '../controller/UserController';
import '../controller/LoginController';

// services
import '../services/authentication/passport/PassportAuthentication';
import '../services/user/UserService';
import '../services/cryptographic/Cryptographic';

// authentication strategies
import '../services/authentication/passport/strategy/JWTStrategy';

// utils
import '../utils/PersistenceClient/MongoDB/MongoPersistenceClient';
