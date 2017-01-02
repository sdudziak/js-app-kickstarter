const CONFIG = <{ [propertyName: string]: any }> {
    basePath:  <string> 'dist/view',
    templates: <{ [templateName: string]: string }>{
        index:             <string> 'index.pug',
        indexUnauthorized: <string> 'index-unauthorized.pug'
    }
};

export default CONFIG;
