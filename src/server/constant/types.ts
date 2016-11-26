const TYPES = {
    IAuthenticationService: Symbol('IAuthenticationService'),
    IStrategy:              Symbol('IStrategy'),
    IPersistenceClient:     Symbol('IPersistenceClient'),
    ICryptographicService:  Symbol('ICryptographicService'),
    User:                   Symbol('User'),
    IUserService:           Symbol('IUserService'),
    IEventManager:          Symbol('IEventManager'),
    IEventManagerProvider:  Symbol('IEventManagerProvider'),
    SocketIO:               Symbol('SocketIO.Server'),
    ILogger:                Symbol('ILogger'),
    IEventListener:         Symbol('IEventListener'),
};

export default TYPES;
