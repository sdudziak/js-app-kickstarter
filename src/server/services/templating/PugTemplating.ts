import * as path from 'path';
import * as pug from 'pug';

import TYPES from '../../constant/types';
import { provideSingleton } from '../../ioc/ioc';
import { ITemplating } from './ITemplating';

@provideSingleton(TYPES.ITemplating)
export class PugTemplating implements ITemplating {
    public renderFile(templateName: string, options?: pug.Options): string {
        options.cache = process.env.NODE_ENV !== 'development';
        const templateFullPath: string = path.resolve('dist', 'view', templateName);
        return pug.renderFile(templateFullPath, options);
    }
}
