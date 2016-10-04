import { Controller, Get, TYPE } from 'inversify-express-utils';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';

@provideNamed(TYPE.Controller, TAGS.IndexController)
@Controller(ROUTES.app)
export class IndexController {

    @Get('/')
    public get(): string {
        return 'Home sweet home';
    }
}

