import { InversifyExpressServer, interfaces } from 'inversify-express-utils'
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cusrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { kernel } from './ioc/ioc';
import * as config from './config/index';


// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';

// start the server
let server: interfaces.InversifyExpressServer = new InversifyExpressServer(kernel);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cusrf());
    app.use(cookieParser());
    app.use('/' + config.path.public, express.static(path.resolve(__dirname, config.path.public)));

    app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
        if (err.code !== 'EBADCSRFTOKEN') { return next(err); }

        // handle CSRF token errors here
        res.status(403);
        res.send('form tampered with');
    })

});

let app = server.build();
app.listen(config.url.port);
console.log(`Server started on port ${config.url.port} :)`);

exports = module.exports = app;
