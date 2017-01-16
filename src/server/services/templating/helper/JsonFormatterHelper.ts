import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';

import { ITemplatingHelper } from '../ITemplatingHelper';

@provideSingleton(TYPES.ITemplatingHelper)
export class JsonFormatterHelper implements ITemplatingHelper {
    public helperName(): string {
        return 'json';
    }

    public helperMethod(context: any): string {
        return JSON.stringify(context);
    }

}
