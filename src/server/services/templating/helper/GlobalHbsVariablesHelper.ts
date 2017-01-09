import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';
import * as CONFIG from '../../../config';

import { ITemplatingHelper } from '../ITemplatingHelper';

@provideSingleton(TYPES.ITemplatingHelper)
export class GlobalHbsVariablesHelper implements ITemplatingHelper {
    public helperName(): string {
        return 'globals';
    }

    public helperMethod(): Function {
        return () => ({
            appURI: CONFIG.url.app
        });
    }

}
