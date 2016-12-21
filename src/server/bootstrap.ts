import { interfaces, InversifyExpressServer } from 'inversify-express-utils'
import * as io from 'socket.io';
import { kernel } from './ioc/ioc';
import './ioc/loader';
import TYPES from './constant/types';
import { ApplicationServer } from './services/application/ApplicationServer';

let server: interfaces.InversifyExpressServer = new InversifyExpressServer(kernel);

const applicationServer: ApplicationServer
          = kernel.get<ApplicationServer>(TYPES.ApplicationServer);

applicationServer.setExpress(server);

const socketIO: SocketIO.Server = io(applicationServer.getServer());
kernel.bind<SocketIO.Server>(TYPES.SocketIO).toConstantValue(socketIO);

applicationServer.run(kernel);

exports = module.exports = applicationServer.getServer();
