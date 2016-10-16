const TYPES = {
    IAuthenticationService: Symbol('PassportAuthentication'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    User:                   Symbol('User'),
    UserService:            Symbol('UserService'),
};

export default TYPES;
