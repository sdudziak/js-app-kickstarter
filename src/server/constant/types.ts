const TYPES = {
    ApplicationServer:          Symbol('ApplicationServer'),
    IAuthenticationService:     Symbol('IAuthenticationService'),
    ICryptographicService:      Symbol('ICryptographicService'),
    IEventListener:             Symbol('IEventListener'),
    IEventManager:              Symbol('IEventManager'),
    IEventManagerProvider:      Symbol('IEventManagerProvider'),
    ILogger:                    Symbol('ILogger'),
    IPersistenceClient:         Symbol('IPersistenceClient'),
    ISocketConnectedUsers:      Symbol('ISocketConnectedUsers'),
    IStrategy:                  Symbol('IStrategy'),
    ITemplating:                Symbol('ITemplating'),
    IUserService:               Symbol('IUserService'),
    PostInstantiateInitializer: Symbol('PostInstantiateInitializer'),
    PreBuildInitializer:        Symbol('PreBuildInitializer'),
    SocketIO:                   Symbol('SocketIO.Server'),
    User:                       Symbol('User'),
};

export default TYPES;
