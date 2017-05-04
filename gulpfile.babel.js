const gulp          = require('gulp');
const source        = require('vinyl-source-stream');
const uglify        = require('gulp-uglify');
const buffer        = require('vinyl-buffer');
const notify        = require('gulp-notify');
const nodemon       = require('gulp-nodemon');
const livereload    = require('gulp-livereload');
const typescript    = require('gulp-typescript');
const sass          = require('gulp-sass');
const webpackStream = require('webpack-stream');
const webpack2      = require('webpack');
const browserSync   = require('browser-sync');
const superstatic   = require('superstatic');
const gutil         = require("gulp-util");

const gulpConfig    = require('./gulpfile.config');
const webpackConfig = require('./webpack.config');
const path          = require("path");

const tsProject      = typescript.createProject('tsconfig.json');
const tsProjectFront = typescript.createProject('tsconfig.front.json', {declaration: true});

/* BACKEND */
gulp.task(gulpConfig.tasks.backend.build, function () {
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(gulpConfig.path.buildDest));
});

gulp.task(gulpConfig.tasks.backend.assets, function () {
    return gulp.src([
        gulpConfig.path.backend + '**/*.json',
        gulpConfig.path.backend + '**/*.hbs',
    ]).pipe(gulp.dest(gulpConfig.path.buildDest));
});
/* FINISH BACKEND */

/* FRONTEND */
gulp.task(gulpConfig.tasks.frontend.build, function () {
    return tsProjectFront
        .src()
        .pipe(tsProjectFront())
        .js
        .pipe(gulp.dest(gulpConfig.path.buildDestFront));
});


gulp.task(gulpConfig.tasks.frontend.assets, function () {
    return gulp.src(gulpConfig.path.frontend + 'assets/**/**/**')
        .pipe(gulp.dest(gulpConfig.path.buildDestFront + '/assets'));
});

gulp.task(gulpConfig.tasks.frontend.html, function () {
    return gulp.src(gulpConfig.path.frontend + '**/*.html')
        .pipe(gulp.dest(gulpConfig.path.buildDestFront));
});

gulp.task(gulpConfig.tasks.frontend.sass, function () {
    return gulp.src(gulpConfig.path.frontend + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(gulpConfig.path.buildDestFrontCss));
});

gulp.task(gulpConfig.tasks.frontend.js, function () {
    return gulp.src(gulpConfig.path.frontend + '**/*.js')
        .pipe(gulp.dest(gulpConfig.path.buildDestFront));
});

// Basic usage
gulp.task(gulpConfig.tasks.common.webpack, function (callback) {
    webpackStream(webpackConfig, webpack2, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', stats);
        }
        gutil.log('[webpack]', stats.toString());
        callback();
    });
});

gulp.task(gulpConfig.tasks.common.serve, () => {
    console.log('Starting browserSync and superstatic...\n');

    browserSync({
        port:           3000,
        files:          ['index.html', '**/bundle.js'],
        injectChanges:  true,
        logFileChanges: false,
        logLevel:       'silent',
        logPrefix:      'reactTypescript',
        notify:         true,
        reloadDelay:    200,
        server:         {
            baseDir:    './public',
            middleware: superstatic({debug: true})
        }
    });
});

gulp.task(gulpConfig.tasks.common.frontend, [
    gulpConfig.tasks.frontend.build,
    gulpConfig.tasks.frontend.assets,
    gulpConfig.tasks.frontend.js,
    gulpConfig.tasks.frontend.sass,
    gulpConfig.tasks.frontend.html,
    gulpConfig.tasks.common.webpack
]);

/* FINISH FRONTEND */

gulp.task(gulpConfig.tasks.common.watch, function () {

    livereload.listen();
    gulp.watch([
        gulpConfig.path.frontend + '**/*.ts',
        gulpConfig.path.frontend + '**/**/*.ts',
        gulpConfig.path.frontend + '**/*.tsx',
        gulpConfig.path.frontend + '**/**/*.tsx',
        gulpConfig.path.frontend + 'assets/**/*',
        gulpConfig.path.frontend + '**/*.scss',
        gulpConfig.path.backend + '**/*.hbs'
    ], [
        gulpConfig.tasks.common.frontend
    ]);

    //be care my friends, here nodemon runs from the current gulpfile's directory, because of this the: ext: 'ts'
    nodemon({
        // the script to run the app
        script: gulpConfig.path.buildDest + 'bootstrap.js',
        tasks:  [
            gulpConfig.tasks.backend.build,
            gulpConfig.tasks.backend.assets
        ],
        ext:    'ts json',
        ignore: [
            'public/',
            'build/',
            'frontend/',
            'gulpfile.js',
            'package.json',
            'tsconfig.json'
        ]
    }).on('restart', function () {
        // when the app has restarted, run livereload.
        gulp.src(gulpConfig.path.buildDest + 'bootstrap.js')
            .pipe(livereload())
            .pipe(notify('Server restarted, reloading page...'));
    });

});

gulp.task(gulpConfig.tasks.common.default, [
    gulpConfig.tasks.common.frontend,
    gulpConfig.tasks.backend.build,
    gulpConfig.tasks.backend.assets,
    gulpConfig.tasks.common.watch
]);
