const gulp        = require('gulp');
const source      = require('vinyl-source-stream');
const uglify      = require('gulp-uglify');
const buffer      = require('vinyl-buffer');
const notify      = require('gulp-notify');
const nodemon     = require('gulp-nodemon');
const livereload  = require('gulp-livereload');
const typescript  = require('gulp-typescript');
const sass        = require('gulp-sass');
const webpack     = require('webpack-stream');
const browserSync = require('browser-sync');
const superstatic = require('superstatic');


const gulpConfig    = require('./config/gulpfile.config');
const webpackConfig = require('./config/webpack.config');

const tsProject      = typescript.createProject('tsconfig.json', {declaration: true});
const tsProjectFront = typescript.createProject('tsconfig.front.json', {declaration: true});

/* BACKEND */
gulp.task(gulpConfig.tasks.backend.build, function () {
    // instead of gulp.src(["src/**/*.ts", "src/**/**/*.ts"])
    // lib, and lib/queries.
    // except lib.d.ts. Maybe for future use:  { base: './src/' }
    const tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(gulpConfig.path.buildDest));
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
