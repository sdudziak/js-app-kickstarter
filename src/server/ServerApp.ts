import * as express from 'express'


export class ServerApp {

    private app: express.Express;

    constructor() {
        this.app = express();
    }

    public setRoutes() {
        this.app.get('/', this.renderHelloWorld);
    }

    public startServer() {
        this.app.listen(3333, function () {
            console.log('Example app listening on port 5000!');
        });
    }

    private renderHelloWorld(req: express.Request, res: express.Response) {
        res.send('Hello World!');
    }
}
