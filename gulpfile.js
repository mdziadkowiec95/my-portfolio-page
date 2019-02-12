const { src, dest, series, parallel, watch } = require('gulp');

const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const browsersync = require("browser-sync").create();

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfigDev = require('./webpack.config.dev.js');
const webpackConfigProd = require('./webpack.config.prod.js');

const dist = 'dist/';
const source = 'src/';

// stylesheet paths and settings
const css = {
  in: source + 'sass/app.scss',
  out: source + 'css',
  build: dist + 'css',
  sassOptions: {
    // outputStyle: 'compressed',
    errLogToConsole: true
  },
  watch: source + "sass/**/*.scss"
};

// BrowserSync settings
const syncOpts = {
  server: {
    baseDir: source
    // index: "index.html"
  },
  open: true,
  notify: true
};


// TASKS
function clean(cb) {
  del([dist + "*"])
  cb()
}

function watchFiles() {
  watch(css.watch, series(styles))
}

function styles(cb) {
  src(css.in)
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOptions))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 2%']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(css.out))
    .pipe(browsersync.reload({ stream: true }))

  cb()
}



function jsProd(cb) {
  src('src/js/index.js')
    .pipe(webpackStream(webpackConfigProd), webpack)
    .pipe(dest('dist/js'))
  cb()
}

function jsDev(cb) {
  src('src/js/index.js')
    .pipe(webpackStream(webpackConfigDev), webpack)
    .pipe(dest('src/js'))
  browsersync.reload()
  cb()
}



function html(cb) {
  // src('src/**/*.html')
  watch('src/**/*.html', series(html, browsersync.reload))

  cb()
}

function bSync(cb) {
  browsersync.init(syncOpts)
  watch(source + 'js/index.js', jsDev)

  cb()
}

function cssMin(cb) {
  src('src/css/**/*.css')
    .pipe(cssnano())
    .pipe(dest('dist/css'))

  cb()
}


function copyAssets(cb) {
  const html = 'src/**/*.html';

  src([html], {
    base: 'src',
  })

    .pipe(dest('dist'))
  cb()

}

exports.default = series(styles, jsDev, html, bSync, watchFiles);
exports.build = series(copyAssets, cssMin, jsProd);