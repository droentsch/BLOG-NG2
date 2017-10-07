import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as runSequence from 'run-sequence';
import * as flatten from 'gulp-flatten';
import * as concat from 'gulp-concat';
import * as replace from 'gulp-replace';
import * as del from 'del';
import * as path from 'path';
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
    CONTENT: './dist/prod/content'
};
const COVERAGE = './coverage';
const TARGET = DEST.PROD; //default
const APP = `${DEST.ROOT}/app`;
const DEST_JS = path.join(TARGET, 'js');
const LINT_CONFIG = 'tslint.json';

const SOURCE = {
    ROOT: './src/app',
    TS: `./src/app/**/*.ts`,
    JS: `./src/app/**/*.js`,
    MAP: `./src/app/**/*.js.map`,
    CONTENT: './src/content/**/*'
}
const LIB = `${DEST}/app/node_modules`;
const PROD_CODE_FILE = 'app.js';
const INDEX = 'index.html';
const CACHE_REPLACER = /v11111v/g;
const VERSION_REPLACER = /tag11111tag/g;
const SYS_CONFIG = 'systemjs.config.js';
const NODE_DIR = 'node_modules';
const ROOT = '/';
const ASSETS = {
    SRC: './assets/**/*'
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

gulp.task('copy.assets', (done) => {
    gulp.src(INDEX)
        .pipe(replace(CACHE_REPLACER, new Date().getTime().toString()))
        .pipe(replace(VERSION_REPLACER, lib.getTag()))
        .pipe(gulp.dest(TARGET));
    gulp.src(lib.LIB)
        .pipe(gulp.dest(DEST_JS));
    gulp.src(ASSETS.SRC)
        .pipe(gulp.dest(TARGET));
    gulp.src(SOURCE.CONTENT)
        .pipe(gulp.dest(DEST.CONTENT));
    done();
});

gulp.task('lint', () => {
    return gulp.src(SOURCE.TS)
        .pipe(tslint({
            configuration: LINT_CONFIG,
            formatter: "prose"
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

gulp.task('karma.jasmine', (done: any) => {
    return KarmaServer.start({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, () => {
        done();
    });
});

gulp.task('dev.build', () => {
    return gulp.src(SOURCE.TS, { base: '.' })
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

gulp.task('prod', () => {
    runSequence('cleanup', 'lint', 'build', 'bundle.js', 'copy.assets');
});
gulp.task('prodMin', () => {
    runSequence('cleanup', 'lint', 'build', 'bundle.js.min', 'copy.assets');
});
gulp.task('test', () => {
    runSequence('delete.coverage', 'dev.build', 'karma.jasmine', 'dev.cleanup');
});
