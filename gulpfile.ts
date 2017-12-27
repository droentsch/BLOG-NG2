import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as runSequence from 'run-sequence';
import * as flatten from 'gulp-flatten';
import * as concat from 'gulp-concat';
import * as replace from 'gulp-replace';
import * as del from 'del';
import * as path from 'path';
import * as inject from 'gulp-inject';
import * as gutil from 'gulp-util';
import tslint from 'gulp-tslint';
import TaskLib from './gulp.class.tasklib';
let inline = require('gulp-inline-ng2-template');
let maps = require('gulp-sourcemaps');
let KarmaServer = require('karma').Server;

let tsProject = ts.createProject('./src/tsconfig.json');
let lib = new TaskLib();
const DEST = {
    ROOT: './dist',
    PROD: './dist/prod',
    APP: './dist/prod/app',
    ASSETS: './dist/prod/assets',
    CSS: './dist/prod/css'
};
const COVERAGE = './coverage';
const TARGET = DEST.PROD; // default
const APP = `${DEST.ROOT}/app`;
const DEST_JS = path.join(TARGET, 'js');
const LINT_CONFIG = 'tslint.json';

const SOURCE = {
    ROOT: './src/app',
    TS: `./src/app/**/*.ts`,
    TESTING: './src/testing/**/*.ts',
    JS: `./src/app/**/*.js`,
    MAP: `./src/app/**/*.js.map`,
    CSS: './src/css'
}
const LIB = `${DEST}/app/node_modules`;
const PROD_CODE_FILE = 'app.js';
const INDEX = './src/index.html';
const VERSION_REPLACER = /tag11111tag/g;
const SYS_CONFIG = 'systemjs.config.js';
const NODE_DIR = 'node_modules';
const ROOT = '/';
const ASSETS = {
    SRC: './src/assets/**/*'
}
let getCssTag = function (filename: string) {
    let fullFile = path.join('css', filename);
    // console.info(`css fullFile:${fullFile}`);
    return `<link href="${fullFile}" rel="stylesheet" type="text/css" />`;
}
let getJsTag = function (filename: string): string {
    let fullFile = path.join( 'js', filename);
    return `<script src="${fullFile}"></script>`;
}

let cleanup = function (targets: string[]) {
    return del(targets)
        .then((paths) => {
            console.log(`Deleted files/folders:\n${paths.join('\n')}`);
        })
        .catch((reason) => {
            console.log(`Error deleting targets: ${reason}`)
        });
};

gulp.task('copy.assets', () => {
    return gulp.src(ASSETS.SRC)
        .pipe(gulp.dest(DEST.ASSETS));
});

gulp.task('copy.js', () => {
    return gulp.src(lib.LIB)
    .pipe(gulp.dest(DEST_JS));
});

gulp.task('copy.css', () => {
   return gulp.src([path.join(SOURCE.CSS, 'bootstrap.min.css'), path.join(SOURCE.CSS, 'foundation.css'), path.join(SOURCE.CSS, 'app.css')])
    .pipe(concat('main.css'))
    .pipe(gulp.dest(DEST.CSS));
});

gulp.task('copy.index', () => {
    let appjs = path.join(DEST_JS, 'app.js');
    console.info(`appjs: ${appjs}`);
    return gulp.src(INDEX)
        .pipe(inject(gulp.src(appjs, { read: false }), {
            starttag: '<!-- inject:app:{{ext}} -->',
            relative: true,
            // transform: function (filepath, file) {
            //     console.info(`transform js1 filepath: ${filepath}`);
            //     console.info(`transform js1 file.path: ${file.path}`);
            //     console.info(`transform js1 file.basename: ${file.basename}`);
            //     return  getJsTag(file.basename);
            // }
        }))
        // .pipe(inject(gulp.src([path.join(DEST_JS, '*.js'), `!${appjs}`], { read: false }), {
        //     transform: function (filepath, file) {
        //         return  getJsTag(file.basename);
        //     }
        // }))
        // .pipe(inject(gulp.src([path.join(DEST.CSS, '*.css')], { read: false }), {
        //     transform: function (filepath, file) {
        //         return  getCssTag(file.basename);
        //     }
        // }))
        // .pipe(replace(VERSION_REPLACER, lib.getTag()))
        .pipe(gulp.dest(TARGET));
});

gulp.task('lint', () => {
    gulp.task('prodLocal', () => {
        runSequence('prod', 'copy.local');
    });
    gulp.task('prodMin', () => {
        runSequence('cleanup', 'lint', 'build', 'bundle.js.min', 'copy.assets', 'copy.index');
    });
    return gulp.src(SOURCE.TS)
        .pipe(tslint({
            configuration: LINT_CONFIG,
            formatter: 'prose'
        }))
        .pipe(tslint.report({
            emitError: false,
            allowWarnings: true
        }));
});

gulp.task('cleanup', () => {
    return cleanup([SOURCE.JS, SOURCE.MAP, DEST.ROOT]);
});

gulp.task('dev.cleanup', (done: any) => {
    return cleanup([SOURCE.JS]);
});

gulp.task('delete.coverage', (done: any) => {
    return cleanup([COVERAGE]);
});

gulp.task('bundle.js', () => {
    return lib.bundler(false, APP);
});

gulp.task('bundle.js.min', () => {
    return lib.bundler(true, APP);
});

gulp.task('karma.jasmine', (done: () => void) => {
    return KarmaServer.start({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, () => {
        done();
    });
});

gulp.task('dev.build', () => {
    return gulp.src([SOURCE.TS, SOURCE.TESTING], { base: '.' })
        .pipe(maps.init())
        .pipe(inline({ base: SOURCE, useRelativePaths: true }))
        .pipe(tsProject()).js
        .pipe(maps.write({ sourceRoot: '.' }))
        .pipe(gulp.dest('.'));
});

gulp.task('build', () => {
    return gulp.src(SOURCE.TS)
        .pipe(maps.init())
        .pipe(inline({ base: SOURCE, useRelativePaths: true }))
        .pipe(tsProject()).js
        .pipe(maps.write())
        .pipe(gulp.dest(APP));
});

gulp.task('prod', (done) => {
    runSequence('cleanup', 'lint', 'build', 'bundle.js', 'copy.js', 'copy.css', 'copy.assets', 'copy.index', done);
});
gulp.task('test', () => {
    runSequence('delete.coverage', 'dev.build', 'karma.jasmine', 'dev.cleanup');
});