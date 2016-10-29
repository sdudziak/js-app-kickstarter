const TYPES = {
    IAuthenticationService: Symbol('PassportAuthentication'),
    IPersistenceClient:     Symbol('MongoPersistenceClient'),
    ICryptographicService:  Symbol('Cryptographic'),
    User:                   Symbol('User'),
    IUserService:           Symbol('UserService'),
};

export default TYPES;
