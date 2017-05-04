const gulpConfig = require('./gulpfile.config');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = {
    entry: {
        jquery: 'jquery',
        vendor: ['react', 'react-dom', 'rx'],
        bundle: path.resolve(gulpConfig.webpack.entrypoint)
    },
    output: {
        path: path.resolve(__dirname, './dist/public'),
        filename: '[name]-[hash].js',
        chunkFilename: '[chunkhash].js',
        publicPath: 'public/',
        devtoolModuleFilenameTemplate: "webpack:///[resource-path]"
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }, {
            test: /\.ts(x?)$/,
            include: path.join(__dirname, 'src/frontend'),
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'tsconfig.front.json'
                }
            }],
        }, {
            test: /\.json?$/,
            loaders: ['json-loader']
        }, {
            test: /\.md?$/,
            loaders: ['md-loader']
        }, {
            test: /\.scss?$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)?$/,
            loader: 'url?limit=10000'
        }],
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.scss'],
        alias: {
            'bootstrap/js': 'bootstrap-sass/assets/javascripts/bootstrap.js',
            'bootstrap/css': 'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
            'bootstrap-select/js': 'bootstrap-select/js/bootstrap-select.js',
            'bootstrap-select/css': 'bootstrap-select/sass/bootstrap-select.scss',
            'helmet': 'helmet/index.js'
        }
    },
    watch: true,
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "ws": "ws",
        "fs": "fs",
        "rx": "rx",
        "jquery": "jquery"
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
