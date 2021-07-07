// Gulp.js configuration

const
  // modules
  browserify = require('browserify');
  babelify = require('babelify')
  gulp = require('gulp');
  source = require('vinyl-source-stream');

  var svg = require('svg-browserify');

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  src = 'src/',
  build = 'build/';

  const sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano');

  // CSS processing
function css() {
  return gulp.src(src + '/styles.sass')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 3,
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(postcss([
      cssnano
    ]))
    .pipe(gulp.dest(build + 'css/'));
}

var bundleTask = function() {
  return browserify('index.js')
    .transform(babelify, {presets: ["@babel/preset-env"]})
    .transform(svg)
    .transform(require('browserify-css'))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/'));
};

gulp.task('bundle', bundleTask);

exports.css = gulp.series(css);

exports.build = gulp.parallel(exports.css);

// watch for file changes
function watch(done) {
  // css changes
  gulp.watch(src + '/styles.sass', css);

  done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.css, exports.watch);
