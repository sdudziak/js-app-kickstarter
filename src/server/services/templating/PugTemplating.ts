import * as path from 'path';
import * as pug from 'pug';

import * as CONFIG from '../../config/templating';
import TYPES from '../../constant/types';
import { provideSingleton } from '../../ioc/ioc';
import { ITemplating } from './ITemplating';

@provideSingleton(TYPES.ITemplating)
export class PugTemplating implements ITemplating {

    private basePath: string;
    private compiledTemplates: { [templateName: string]: pug.compileTemplate };

    public constructor() {
        this.basePath = CONFIG.basePath;
    }

    public renderFile(templateName: string, options?: pug.Options): string {
        options.cache = process.env.NODE_ENV !== 'development';
        const templateFullPath: string = path.resolve(this.basePath, templateName);
        return '';
    }

    private init() {
        // CONFIG.templates.forEach
        this.compiledTemplatespug.compileFile(templateFullPath, options)
    }
}
