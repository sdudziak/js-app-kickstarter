var tsconfig = require('./tsconfig.front.json');

var gulpConfig = {
    path:    {},
    tasks:   {},
    webpack: {}
};

gulpConfig.path.source   = './src/';
gulpConfig.path.frontend = gulpConfig.path.source + 'frontend/';
gulpConfig.path.backend  = gulpConfig.path.source + 'server/';

gulpConfig.path.buildDest         = tsconfig.compilerOptions.outDir;
gulpConfig.path.buildDestFront    = gulpConfig.path.buildDest + 'public/';
gulpConfig.path.buildDestFrontCss = gulpConfig.path.buildDestFront + 'css/';

gulpConfig.webpack.entrypoint = gulpConfig.path.frontend + 'app.tsx';

gulpConfig.tasks = {
    frontend: {
        build:  "task.frontend.build",
        assets: "task.frontend.assets",
        html:   "task.frontend.html",
        sass:   "task.frontend.sass",
        js:     "task.frontend.copy-js"
    },
    backend:  {
        build:  "task.backend.build",
        assets: "task.backend.server.assets"
    },
    common:   {
        webpack:  "task.common.run-webpack",
        frontend: "task.common.frontend",
        watch:    "task.common.watch",
        default:  "default",
        serve:    "task.common.serve"
    }
};

module.exports = gulpConfig;
