let config = <any> {
    mongo: <any> {
        host: '127.0.0.1',
        port: 21017,
        login: null,
        password: null,
    },

    path: {
        'public': 'public'
    },

    url: <any> {
        protocol: 'http',
        host: 'localhost',
        port: 8080,
        app: Error("Define me"),
    }
};

config.url.app = config.url.protocol + '://' +
    config.url.host + ':' +
    config.url.port + '/';

export = config;
