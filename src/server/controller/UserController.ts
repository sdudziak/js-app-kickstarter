import { Controller, Get, TYPE } from 'inversify-express-utils';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';
import ROUTES from '../config/routes';
import { JWTAuthenticate } from '../middleware';


@provideNamed(TYPE.Controller, TAGS.UserController)
@Controller(ROUTES.user)
export class UserController {

    @Get('/', JWTAuthenticate)
    public get(): string {
        return 'My sweet users';
    }

}

