import * as CONFIG from '../../../config';
import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';

import { ITemplatingHelper } from '../ITemplatingHelper';

export class GlobalHbsVariablesHelper implements ITemplatingHelper {
    public helperName(): string {
        return 'global';
    }

    public helperMethod(context?: any): Object {
        return {
            config: {
                app: {
                    url: CONFIG.url.app
                }
            }
        };
    }

}
