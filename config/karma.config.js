var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        plugins: [
            "karma-webpack",
            "karma-mocha",
            "karma-chai",
            "karma-sinon",
            "karma-phantomjs-launcher",
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-mocha-reporter",
            "karma-spec-reporter",
            "karma-tape-reporter"
        ],
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            '../test/**/*.ts'
        ],
        exclude: ['../node_modules/'],
        preprocessors: {
            '../test/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        reporters: ['mocha'],
        loggers: [{type: 'console'}],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        autoWatchBatchDelay: 250,
        browsers: ['Chrome'],
        singleRun: false,
        reportSlowerThan: 50,
        concurrency: Infinity
    })
};

