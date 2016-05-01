'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');
const csso = require('gulp-csso');
const order = require('gulp-order');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const sassGlob = require('gulp-sass-glob');
const babel = require('gulp-babel');

const paths = {
    style: {
        sass: {
            src: './gulp/style/common.scss',
            watch: [
                './gulp/style/*.scss',
                './gulp/style/blocks/*.scss'
            ],
        },
        vendor: './gulp/style/vendor/*.css',
        dest: './public/css'
    },
    javascript: {
        src: './gulp/javascript/*.*',
        watch: './gulp/javascript/*.*',
        dest: './public/js'
    }
};

gulp.task('sass', () => {
    return gulp.src(paths.style.sass.src)
        .pipe(sassGlob())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(mmq({
            log: true
        }))
        .pipe(autoprefixer({
            browsers: '> 1%',
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({
            basename: 'client',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.style.dest));
});

gulp.task('vendor-css', () => {
    return gulp.src(paths.style.vendor)
        .pipe(order([
            'normalize.css'
        ]))
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(paths.style.dest));
});

gulp.task('javascript', () => {
    return gulp.src(paths.javascript.src)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.javascript.dest));
});

gulp.task('sass:watch', () => {
    gulp.watch(paths.style.sass.watch, ['sass']);
});

gulp.task('vendor-css:watch', () => {
    gulp.watch(paths.style.vendor, ['vendor-css']);
});

gulp.task('javascript:watch', () => {
    gulp.watch(paths.javascript.watch, ['javascript']);
});

gulp.task('default', [
    'sass', 'sass:watch',
    'vendor-css', 'vendor-css:watch',
    'javascript', 'javascript:watch'
]);
