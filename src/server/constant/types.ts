const TYPES = {
    IAuthenticationService: Symbol('PassportAuthentication'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    User:                   Symbol('User'),
    IUserService:           Symbol('UserService'),
};

export default TYPES;
