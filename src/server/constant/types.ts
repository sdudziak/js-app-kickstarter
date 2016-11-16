const TYPES = {
    IAuthenticationService: Symbol('PassportAuthentication'),
    IStrategy:              Symbol('JwtStrategy'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    ICryptographicService:  Symbol('Cryptographic'),
    User:                   Symbol('User'),
    IUserService:           Symbol('UserService'),
    ISocketIOManager:       Symbol('SocketIOManager'),
    SocketIO:               'SocketIO.Server'
};

export default TYPES;
