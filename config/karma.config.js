var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        plugins: [
            "karma-webpack",
            "karma-mocha",
            "karma-chai",
            "karma-sinon",
            "karma-phantomjs-launcher",
            "karma-firefox-launcher",
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
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
};

