const { src, dest, series, parallel, watch } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function css() {
    return src('src/css/index.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename('main.css'))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function js() {
    return src('src/js/index.js')
        .pipe(browserify({ transform: [babelify.configure({ presets: ['@babel/env'] })] }))
        .pipe(rename('main.bundle.js'))
        .pipe(uglify())
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/assets/*')
        .pipe(imagemin())
        .pipe(dest('build/assets'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['./build/*']);
}

function dev() {
    browserSync.init({
        server: './build'
    });
    watch('src/*.html', html);
    watch('src/css/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/assets/*', images);
}

function build() {
    return series(clean, parallel(js, css), images, html);
}

function prepublish() {
    del(['./lib/*']);
    return src('src/js/lib/toast.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename('index.js'))
        .pipe(dest('lib'))
}

exports.build = build();
exports.dev = series(clean, build(), dev);
exports.prepublish = prepublish;