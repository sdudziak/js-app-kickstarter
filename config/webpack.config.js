var gulpConfig = require('./gulpfile.config');
var path       = require('path');

module.exports = {
    entry:      {
        bundle: gulpConfig.webpack.entrypoint
    },
    output:     {
        filename:   '[name].js',
        publicPath: 'public/'
    },
    module:     {
        loaders: [
            {
                test:    /\.ts(x?)$/,
                loaders: ['babel?plugins[]=transform-runtime', 'awesome-typescript-loader'],
                exclude: /(node_modules)/
            },
            {
                test:    /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test:   /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url?limit=10000'
            },
            {
                test:   require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    },
    //devtool: 'inline-source-map',
    resolve:    {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias:      {
            'bootstrap/js':         'bootstrap-sass/assets/javascripts/bootstrap.js',
            'bootstrap/css':        'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
            'bootstrap-select/js':  'bootstrap-select/js/bootstrap-select.js',
            'bootstrap-select/css': 'bootstrap-select/sass/bootstrap-select.scss'
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
}
