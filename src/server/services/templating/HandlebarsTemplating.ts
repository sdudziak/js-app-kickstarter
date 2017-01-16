import { compile, registerHelper } from 'handlebars';
import { map, forEach } from 'lodash';

import * as fs from 'fs';
import * as path from 'path';

import { CONFIG } from '../../config/templating';
import * as GLOBAL_CONFIG from '../../config';
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
    private templateHelpers: ITemplatingHelper[];

    public constructor(@multiInject(TYPES.ITemplatingHelper) templateHelpers: ITemplatingHelper[],
                       @inject(TYPES.ILogger) private logger: ILogger) {
        this.templateHelpers = templateHelpers;
        this.compiledTemplates = {};
        this.basePath = CONFIG.basePath;
    }

    public render(templateName: string, options: { config?: any } = {}): string {
        options.config = this.getGlobalConfig();
        return this.compiledTemplates[templateName](options);
    }

    public init() {
        for (let i = 0; i < this.templateHelpers.length; i++) {
            const templateHelper = this.templateHelpers[i];
            this.logger.log(`[Templating engine] Registering helper: ${templateHelper.helperName()}`);
            registerHelper(templateHelper.helperName(), templateHelper.helperMethod.bind(this));
        }

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

    private getGlobalConfig(): Object {
        return {
            app: {
                url: GLOBAL_CONFIG.url.app
            }
        };
    }
}
