import * as path from 'path';
import * as fs from 'fs';
import { map } from 'lodash';
import { compile } from 'handlebars';

import { CONFIG } from '../../config/templating';
import TYPES from '../../constant/types';
import { provideSingleton, inject } from '../../ioc/ioc';
import { ITemplating } from './ITemplating';
import { IInitializable } from '../application/IInitializable';
import { ILogger } from '../logger/ILogger';

interface TemplateData {
    name: string,
    template: string
}

@provideSingleton(TYPES.ITemplating)
export class HandlebarsTemplating implements ITemplating, IInitializable {

    private basePath: string;
    private compiledTemplates: {[templateName: string]: HandlebarsTemplateDelegate};

    public constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.compiledTemplates = {};
        this.basePath = CONFIG.basePath;
    }

    public render(templateName: string, options?: any): string {
        return this.compiledTemplates[templateName](options);
    }

    public init() {
        Promise.all<TemplateData>(
            map(CONFIG.templates, (templateName: string) => this.loadSingleTemplateFile(templateName))
        ).then((templatesData: TemplateData[]) => {
            templatesData.forEach((templateData: TemplateData) => {
                this.logger.log('Compiling template: ' + templateData.name);
                this.compiledTemplates[templateData.name] = compile(templateData.template);
            });
        }).catch((rejectReason: NodeJS.ErrnoException) => {
            this.logger.error('Cannot initialize template!', rejectReason);
        });
    }

    private loadSingleTemplateFile(templateName: string): Promise <TemplateData> {
        return new Promise<TemplateData>((resolve, reject) => {
            const templateFullPath: string = path.resolve(this.basePath, templateName);
            fs.readFile(templateFullPath, (error: NodeJS.ErrnoException, data: Buffer) => {
                this.logger.log('Reading template: ' + templateName);
                error ? reject(error) : resolve({
                        name:     templateName,
                        template: data.toString('utf-8')
                    })
            });
        });
    }
}
