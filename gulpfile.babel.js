var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');
var notify      = require('gulp-notify');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');
var typescript  = require('gulp-typescript');
var sass        = require('gulp-sass');
var webpack     = require('gulp-webpack');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');


var gulpConfig    = require('./config/gulpfile.config');
var webpackConfig = require('./config/webpack.config');

var tsProject      = typescript.createProject('tsconfig.json', {declaration: true});
var tsProjectFront = typescript.createProject('tsconfig.front.json', {declaration: true});

/* BACKEND */
gulp.task(gulpConfig.tasks.backend.build, function () {
    // instead of gulp.src(["src/**/*.ts", "src/**/**/*.ts"])
    // lib, and lib/queries.
    // except lib.d.ts. Maybe for future use:  { base: './src/' }
    var tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(gulpConfig.path.buildDest));
});

gulp.task(gulpConfig.tasks.backend.assets, function () {
    return gulp.src(gulpConfig.path.backend + '**/*.json')
        .pipe(gulp.dest(gulpConfig.path.buildDest));
});
/* FINISH BACKEND */

/* FRONTEND */
gulp.task(gulpConfig.tasks.frontend.build, function () {
    // instead of gulp.src(["src/**/*.ts", "src/**/**/*.ts"])
    // lib, and lib/queries.
    // except lib.d.ts. Maybe for future use:  { base: './src/' }
    var tsResult = tsProjectFront.src().pipe(tsProjectFront());

    return tsResult.js.pipe(gulp.dest(gulpConfig.path.buildDestFront));
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
gulp.task(gulpConfig.tasks.common.webpack, function () {
    return gulp
        .src(gulpConfig.webpack.entrypoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(gulpConfig.path.buildDestFront));
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
        gulpConfig.path.frontend + 'assets/**/**/**',
        gulpConfig.path.frontend + '**/*.html',
        gulpConfig.path.frontend + '**/*.scss'
    ], [
        gulpConfig.tasks.common.frontend
    ]);

    //be care my friends, here nodemon runs from the current gulpfile's directory, because of this the: ext: 'ts'
    nodemon({
        // the script to run the app
        script: gulpConfig.path.buildDest + '/server.js',
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
        gulp.src(gulpConfig.path.buildDest + '/server.js')
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
