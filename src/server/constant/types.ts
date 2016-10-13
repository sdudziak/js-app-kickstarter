const TYPES = {
    IAuthenticationService: Symbol('BasicTokenAuthentication'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    User:                   Symbol('User'),
    UserService:            Symbol('UserService'),
};

export default TYPES;
