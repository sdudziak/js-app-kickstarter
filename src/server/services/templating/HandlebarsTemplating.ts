import { compile, registerHelper } from 'handlebars';
import { map } from 'lodash';

import * as fs from 'fs';
import * as path from 'path';

import { CONFIG } from '../../config/templating';
import TYPES from '../../constant/types';
import { inject, multiInject, provideSingleton } from '../../ioc/ioc';
import { IInitializable } from '../application/IInitializable';
import { ILogger } from '../logger/ILogger';
import { ITemplating } from './ITemplating';
import { ITemplatingHelper } from './ITemplatingHelper';

interface ITemplateData {
    name: string,
    template: string
}

@provideSingleton(TYPES.ITemplating)
export class HandlebarsTemplating implements ITemplating, IInitializable {

    private basePath: string;
    private compiledTemplates: { [templateName: string]: HandlebarsTemplateDelegate };

    public constructor(@multiInject(TYPES.ITemplatingHelper) private templateHelpers: ITemplatingHelper[],
                       @inject(TYPES.ILogger) private logger: ILogger) {
        this.compiledTemplates = {};
        this.basePath = CONFIG.basePath;
    }

    public render(templateName: string, options?: any): string {
        return this.compiledTemplates[templateName](options);
    }

    public init() {

        this.templateHelpers.forEach((templateHelper: ITemplatingHelper) =>
            registerHelper(templateHelper.helperName(), templateHelper.helperMethod()));

        Promise.all<ITemplateData>(
            map(CONFIG.templates, (templateName: string) => this.loadSingleTemplateFile(templateName))
        ).then((templatesData: ITemplateData[]) =>
            templatesData.forEach((templateData: ITemplateData) =>
                this.compiledTemplates[templateData.name] = compile(templateData.template))
        ).catch((rejectReason: NodeJS.ErrnoException) => {
            this.logger.error('Cannot initialize template!', rejectReason);
        });
    }

    private loadSingleTemplateFile(templateName: string): Promise <ITemplateData> {
        return new Promise<ITemplateData>((resolve, reject) => {
            const templateFullPath: string = path.resolve(this.basePath, templateName);
            fs.readFile(templateFullPath, (error: NodeJS.ErrnoException, data: Buffer) =>
                error ? reject(error) : resolve({
                        name:     templateName,
                        template: data.toString('utf-8')
                    })
            );
        });
    }
}
