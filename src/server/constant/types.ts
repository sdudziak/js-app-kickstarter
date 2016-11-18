const TYPES = {
    IAuthenticationService: Symbol('PassportAuthentication'),
    IStrategy:              Symbol('JwtStrategy'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    ICryptographicService:  Symbol('Cryptographic'),
    User:                   Symbol('User'),
    IUserService:           Symbol('UserService'),
    IEventManager:          Symbol('MultipleProvidersEventManager'),
    IEventManagerProvider:  Symbol('IEventManagerProvider'),
    SocketIO:               Symbol('SocketIO.Server')
};

export default TYPES;
