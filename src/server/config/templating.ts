export interface ITemplatingConfig {
    basePath: string,
    templates: {
        index: string,
        indexUnauthorized: string
    }
}

export const CONFIG: ITemplatingConfig = {
    basePath:  'dist/view',
    templates: {
        index:             'index.hbs',
        indexUnauthorized: 'index-unauthorized.hbs'
    }
};
