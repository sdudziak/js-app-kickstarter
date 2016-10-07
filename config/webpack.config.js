var gulpConfig = require('./gulpfile.config');
var path       = require('path');
var pkg        = require('../package.json');
var webpack    = require('webpack');

module.exports = {
    entry:      {
        bundle: gulpConfig.webpack.entrypoint,
        vendor: ['react', 'react-dom', 'rx'],
        jquery: ['jquery']
    },
    output:     {
        path:       __dirname + '/dist',
        filename:   "[name].js",
        publicPath: 'public/'
    },
    module:     {
        loaders: [{
            test:    /\.ts(x?)$/,
            loaders: ['babel?plugins[]=transform-runtime', 'awesome-typescript-loader']
        }, {
            test:    /\.json$/,
            loaders: ['json-loader']
        }, {
            test:    /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test:   /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url?limit=10000'
        }, {
            test:   require.resolve('jquery'),
            loader: 'expose?$!expose?jQuery'
        }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    },
    node:       {
        fs:            "empty",
        net:           "empty",
        child_process: "empty",
        dns:           "empty",
        "5":           "empty"
    },
    //devtool: 'inline-source-map',
    resolve:    {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.scss'],
        alias:              {
            'bootstrap/js':         'bootstrap-sass/assets/javascripts/bootstrap.js',
            'bootstrap/css':        'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
            'bootstrap-select/js':  'bootstrap-select/js/bootstrap-select.js',
            'bootstrap-select/css': 'bootstrap-select/sass/bootstrap-select.scss',
            'helmet':               'helmet/index.js'
        }
    },
    watch:      true,
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals:  {
        "react":     "React",
        "react-dom": "ReactDOM"
    },
    plugins:    [
        new webpack.optimize.CommonsChunkPlugin(['vendor', 'jquery', 'bundle'], '[name].min.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
