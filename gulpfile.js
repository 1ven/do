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
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const glob = require('glob');
const es = require('event-stream');
const spritesmith = require('gulp.spritesmith');

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
        dest: './public/js'
    },
    sprite: {
        src: './gulp/images/sprite/*.png',
        watch: './gulp/images/sprite/*.png',
        dest: './public/images',
        icons: './gulp/style/'
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

gulp.task('javascript', (done) => {
    glob(paths.javascript.src, (err, files) => {
        if (err) { done(err); }

        const tasks = files.map(file => {
            const bundler = watchify(
                browserify(file, {
                    debug: false
                }).transform(babel)
            );

            const bundle = () => bundler.bundle()
                .on('error', function(err) {
                    console.error(err);
                    this.emit('end');
                })
                .pipe(source(file))
                .pipe(rename({
                    dirname: '',
                    suffix: '.min'
                }))
                .pipe(gulp.dest(paths.javascript.dest));

            bundler.on('update', () => {
                console.log('Bundling...');
                bundle();
            });

            return bundle;
        });

        es.merge(tasks.map(task => task())).on('end', done);
    });

});

gulp.task('sprite', function() {
    let spriteData;

    spriteData = gulp.src(paths.sprite.src).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        padding: 5,
        algorithm: 'binary-tree',
        cssVarMap: function(sprite) {
            sprite.name = "s-" + sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest(paths.sprite.dest));

    return spriteData.css.pipe(gulp.dest(paths.sprite.icons));
});

gulp.task('sass:watch', () => {
    gulp.watch(paths.style.sass.watch, ['sass']);
});

gulp.task('sprite:watch', () => {
    gulp.watch(paths.sprite.watch, ['sprite']);
});

gulp.task('vendor-css:watch', () => {
    gulp.watch(paths.style.vendor, ['vendor-css']);
});

gulp.task('default', [
    'sass', 'sass:watch',
    'vendor-css', 'vendor-css:watch',
    'sprite', 'sprite:watch',
    'javascript'
]);
