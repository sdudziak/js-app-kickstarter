const config = <any> {
    mongo: <any> {
        host:     '127.0.0.1',
        port:     21017,
        login:    null,
        password: null,
        database: 'crime-alert'
    },

    path: {
        'public': 'public'
    },

    url: <any> {
        protocol: 'http',
        host:     'localhost',
        port:     8080,
        app:      Error("Define me"),
    },

    app: {
        secret: '97giabg9gabsdf97[g4gtqt40gaovbd(&FWEVF*^YVPFEV_$FW*ER_$#GT$&G(EBAGF(&SRB$)*T$'
    }
};

config.url.app = config.url.protocol + '://' +
    config.url.host + ':' +
    config.url.port + '/';

export = config;
