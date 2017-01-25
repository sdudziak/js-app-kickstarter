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
    ITemplatingHelper:          Symbol('ITemplatingHelper'),
    IUserService:               Symbol('IUserService'),
    PostInstantiateInitializer: Symbol('PostInstantiateInitializer'),
    PreBuildInitializer:        Symbol('PreBuildInitializer'),
    SocketIO:                   Symbol('SocketIO.Server'),
    User:                       Symbol('User'),

    IExceptionHandler:                      Symbol('IExceptionHandler'),
    IExceptionToRequestErrorMapper:         Symbol('IExceptionToRequestErrorMapper'),
    IExceptionToRequestErrorMapperStrategy: Symbol('IExceptionToRequestErrorMapperStrategy'),

    IWorker:        Symbol('IWorker'),
    IWorkerManager: Symbol('IWorkerManager'),
};

export default TYPES;
