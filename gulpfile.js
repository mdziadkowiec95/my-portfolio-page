const { src, dest, series, parallel, watch } = require('gulp');

const del = require('del'),
  dotenv = require('dotenv').config(),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  combineMq = require('gulp-combine-mq'),
  useref = require('gulp-useref'),
  replace = require('gulp-replace'),
  htmlmin = require('gulp-htmlmin'),
  browsersync = require("browser-sync").create(),
  gutil = require('gulp-util'),
  ftp = require('vinyl-ftp'),
  plumber = require('gulp-plumber'),
  imagemin = require("gulp-imagemin"),
  svgInject = require('gulp-svg-inject'),
  svgSprite = require('gulp-svg-sprite'),

  // svgMin = require('gulp-svgmin'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  webpackConfigDev = require('./webpack.config.dev.js'),
  webpackConfigProd = require('./webpack.config.prod.js');

const dist = 'dist/';
const source = 'src/';

// stylesheet paths and settings
const css = {
  in: source + 'sass/app.scss',
  out: source + 'assets/css',
  build: dist + 'css',
  sassOptions: {
    // outputStyle: 'compressed',
    errLogToConsole: true
  },
  watch: source + "sass/**/*.scss"
};

const js = {
  in: source + 'js/index.js',
  out: source + 'assets/js',
  build: dist + 'js',
  watch: source + 'js/**/*.js',

};

const img = {
  in: source + 'assets/images/**/*',
  out: dist + 'images',
}

// BrowserSync settings
const syncOpts = {
  server: {
    baseDir: source,
    serveStaticOptions: {
      extensions: ['html']
    }
  },
  open: true,
  notify: true
};


// TASKS
function clean(cb) {
  del([dist + "**/*"])

  cb()
}

function watchFiles() {
  watch(css.watch, series(styles))
  watch(js.watch, series(jsDev))
}

function styles(cb) {
  src(css.in)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOptions))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%']
    }))
    .pipe(combineMq({
      beautify: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(css.out))
    .pipe(browsersync.reload({ stream: true }))

  cb()
}

function scssLint(cb) {
  src(source + 'sass/**/*/.scss')
    .pipe(scsslint({
      'config': 'scss-lint.yml',
    }))

  cb()
}


function jsProd(cb) {
  src(js.in)
    .pipe(webpackStream(webpackConfigProd), webpack)
    .pipe(dest(js.build))
  cb()
}

function jsDev(cb) {
  src(js.in)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigDev), webpack)
    .pipe(dest(js.out))
  browsersync.reload()
  cb()
}

function images(cb) {
  src(img.in)
    // .pipe(newer(dist + 'images/**/*'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(dest(img.out))

  cb()
}

// function svgInject(cb) {
//   src([source + '**/*.html','/src/**/*.js'])
//     .pipe(svgInject())
//     .pipe(dest(dist))

//     cb()
// }




function html(cb) {
  // src('src/**/*.html')
  watch('src/**/*.html', series(html, browsersync.reload))

  cb()
}

function bSync(cb) {
  browsersync.init(syncOpts)

  cb()
}

function cssMin(cb) {
  src(css.out + '/*.css')
    .pipe(cssnano())
    // .pipe(replace('../../images/', '../images/'))
    .pipe(dest('dist/css'))

  cb()
}


function copyFiles(cb) {
  const html = 'src/**/*.html';

  src([html])
    .pipe(useref())
    .pipe(dest('dist'))
  cb()

}

function htmlMin(cb) {
  src('dist/*.html')
    .pipe(replace('assets/images/', 'images/'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(dist))

  cb()
}

function copyPHPmailer(cb) {
  src('./php-mailer/**/*')
    .pipe(dest(dist))
  cb()
}





/** Configuration **/
var user = process.env.FTP_USER
var password = process.env.FTP_PWD
var host = 'ftp.hrmdrum.vot.pl';
var port = 21
var localFilesGlob = ['dist/**/*'];
var remoteFolder = '/domains/michaldziadkowiec.pl/public_html';

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  return ftp.create({
    host: host,
    port: port,
    user: user,
    password: password,
    parallel: 5,
    log: gutil.log,
  })
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
function deploy(cb) {
  var conn = getFtpConnection()

  src(localFilesGlob, { base: './dist', buffer: false })
    // .pipe(conn.newer(remoteFolder)) // only upload newer files
    .pipe(conn.dest(remoteFolder))
  cb()
};

exports.default = series(styles, scssLint, jsDev, html, bSync, watchFiles);
exports.build = series(cssMin, jsProd, images, copyFiles, copyPHPmailer);
exports.upload = series(deploy);
exports.cssMin = series(cssMin);
exports.copy = series(copyFiles);
exports.mailer = series(copyPHPmailer);
exports.htmlMin = series(htmlMin);