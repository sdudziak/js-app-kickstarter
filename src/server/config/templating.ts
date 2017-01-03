export interface ITemplatingConfig {
    basePath: string,
    templates: {[templateName: string]: string};
}

export const CONFIG: ITemplatingConfig = {
    basePath:  'dist/view',
    templates: {
        index:             <string> 'index.pug',
        indexUnauthorized: <string> 'index-unauthorized.pug'
    }
};
