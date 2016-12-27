const gulpConfig    = require('./gulpfile.config');
const path          = require('path');
const webpack       = require('webpack');
// const CheckerPlugin = require('awesome-typescript-loader');

const config = {
    entry:      {
        vendor: ['react', 'react-dom', 'rx', 'jquery'],
        bundle: gulpConfig.webpack.entrypoint
    },
    output:     {
        path:       __dirname + '/dist',
        filename:   "[name].js",
        publicPath: 'public/'
    },
    module:     {
        loaders:    [{
            test:    /\.(ts|tsx)$/,
            loaders: ['babel?plugins[]=transform-runtime', 'awesome-typescript-loader']
        }, {
            test:    /\.json$/,
            loaders: ['json-loader']
        }, {
            test:    /\.md$/,
            loaders: ['md-loader']
        }, {
            test:    /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test:   /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url?limit=10000'
        }, {
            test:   require.resolve('jquery'),
            loader: 'expose?$!expose?jQuery'
        }],
        preLoaders: [{
            test: /\.js$/, loader: "source-map-loader"
        }],
        noParse:    [/\.md$/]
    },
    ts:         {
        configFileName: "tsconfig.front.json",
        // skipLibCheck:   true,
        // transpileOnly:  true
    },
    externals:  ['ws', 'fs'],
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    },
    node:       {
        net:           "empty",
        child_process: "empty",
        dns:           "empty",
        "5":           "empty"
    },
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
    // externals:  {
    //     "react":     "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins:    [
        // new CheckerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names:    ['vendor'],
            filename: '[name].js'
        }, Infinity),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.devtool = 'inline-source-map';
}

module.exports = config;
