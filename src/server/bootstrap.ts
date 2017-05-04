import { InversifyExpressServer } from 'inversify-express-utils';
import TYPES from './constant/types';
import { kernel } from './ioc/ioc';
import './ioc/loader';
import { ApplicationServer } from './services/application/ApplicationServer';

let server: InversifyExpressServer = new InversifyExpressServer(kernel);

const applicationServer: ApplicationServer
          = kernel.get<ApplicationServer>(TYPES.ApplicationServer);

applicationServer.setExpress(server);
applicationServer.run(kernel);

exports = module.exports = applicationServer.getServer();
