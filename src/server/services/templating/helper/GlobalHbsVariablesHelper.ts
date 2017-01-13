import TYPES from '../../../constant/types';
import { provideSingleton } from '../../../ioc/ioc';
import * as CONFIG from '../../../config';

import { ITemplatingHelper } from '../ITemplatingHelper';

@provideSingleton(TYPES.ITemplatingHelper)
export class GlobalHbsVariablesHelper implements ITemplatingHelper {
    public helperName(): string {
        return 'global';
    }

    public helperMethod(): Function {
        const config: any = {
            config: {
                app: {
                    url: CONFIG.url.app
                }
            }
        };
        console.log(config);
        return () => config;
    }

}
