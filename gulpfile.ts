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
let tsServerProject = ts.createProject('./tsconfig.server.json');
let lib = new TaskLib();
const DEST = {
    ROOT: './dist',
    PROD: './dist/prod',
    APP: './dist/prod/app',
    ASSETS: './dist/prod/assets',
    CSS: './dist/prod/assets/css',
    IMG: './dist/prod/assets/img',
    FONT: './dist/prod/assets/css/fonts',
    CONTENT: './dist/prod/content',
    CONFIG: './dist/prod/config'
};
const COVERAGE = './coverage';
const TARGET = DEST.PROD; // default
const APP = `${DEST.ROOT}/app`;
const DEST_JS = path.join(TARGET, 'js');
const LINT_CONFIG = 'tslint.json';
const NODE_TS = './server.ts';
const SOURCE = {
    ROOT: './src/app',
    TS: `./src/app/**/*.ts`,
    TESTING: './src/testing/**/*.ts',
    JS: `./src/app/**/*.js`,
    MAP: `./src/app/**/*.js.map`,
    CSS: './src/assets/css',
    IMG: './src/assets/img/**/*',
    FONT: './src/assets/css/fonts/**/*',
    CONTENT: './src/assets/content/**/*',
    CONFIG: './src/assets/config/**/*'
}
const LIB = `${DEST}/app/node_modules`;
const PROD_CODE_FILE = 'app.js';
const INDEX = './src/index.html';
const VERSION_REPLACER = /tag11111tag/g;
const SYS_CONFIG = 'systemjs.config.js';
const NODE_DIR = 'node_modules';
const ROOT = '/';
let getCssTag = function (filename: string) {
    let fullFile = path.join('assets/css', filename);
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

gulp.task('copy.js', () => {
    return gulp.src(lib.LIB)
    .pipe(gulp.dest(DEST_JS));
});

gulp.task('copy.img', () => {
    return gulp.src(SOURCE.IMG)
    .pipe(gulp.dest(DEST.IMG));
});

gulp.task('copy.css', () => {
   return gulp.src([path.join(SOURCE.CSS, 'bootstrap.min.css'), path.join(SOURCE.CSS, 'blog.css'), path.join(SOURCE.CSS, 'app.css')])
    .pipe(concat('site.css'))
    .pipe(gulp.dest(DEST.CSS));
});

gulp.task('copy.fonts', () => {
    return gulp.src(SOURCE.FONT)
     .pipe(gulp.dest(DEST.FONT));
 });

gulp.task('copy.config', () => {
    return gulp.src(SOURCE.CONFIG)
     .pipe(gulp.dest(DEST.CONFIG));
 });

 gulp.task('copy.content', () => {
    return gulp.src(SOURCE.CONTENT)
     .pipe(gulp.dest(DEST.CONTENT));
 });

gulp.task('copy.index', () => {
    let appjs = path.join(DEST_JS, 'app.js');
    return gulp.src(INDEX)
        .pipe(inject(gulp.src(appjs, { read: false }), {
            starttag: '<!-- inject:app:{{ext}} -->',
            transform: function (filepath, file) {
                return  getJsTag(path.basename(file.path));
            }
        }))
        .pipe(inject(gulp.src([path.join(DEST_JS, '*.js'), `!${appjs}`], { read: false }), {
            transform: function (filepath, file) {
                return  getJsTag(path.basename(file.path));
            }
        }))
        .pipe(inject(gulp.src([path.join(DEST.CSS, '*.css')], { read: false }), {
            transform: function (filepath, file) {
                return  getCssTag(path.basename(file.path));
            }
        }))
        .pipe(replace(VERSION_REPLACER, lib.getTag()))
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

gulp.task('build.server', () => {
    return gulp.src(NODE_TS)
        .pipe(tsServerProject()).js
        .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('prod', (done) => {
    runSequence('cleanup', 'lint', 'build', 'bundle.js',
                'copy.js', 'copy.css', 'copy.img', 'copy.fonts', 'copy.config',
                'copy.content', 'copy.index', 'build.server', done);
});
gulp.task('test', () => {
    runSequence('delete.coverage', 'dev.build', 'karma.jasmine', 'dev.cleanup');
});
