const config = <any> {
    mongo: <any> {
        host:     '127.0.0.1',
        port:     27017,
        login:    'crimeAlert',
        password: 'abcdef',
        database: 'crime-alert'
    },

    path: {
        'public': 'public'
    },

    url: <any> {
        protocol: 'http',
        host:     'localhost',
        port:     8080,
    },

    app: {
        secret: '97giabg9gabsdf97[g4gtqt40gaovbd(&FWEVF*^YVPFEV_$FW*ER_$#GT$&G(EBAGF(&SRB$)*T$',
        tokenLifetime: 2592000000 // 1 month in milliseconds
    }
};

config.url.app = config.url.protocol + '://' +
    config.url.host + ':' +
    config.url.port + '/';

export = config;
