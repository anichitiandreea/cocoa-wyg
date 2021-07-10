// Gulp.js configuration

const
  // modules
  browserify = require('browserify');
  babelify = require('babelify')
  gulp = require('gulp')
  source = require('vinyl-source-stream')
  svg = require('svg-browserify'),
  buffer = require('vinyl-buffer');

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  src = 'src/',
  build = 'dist/';

const
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

  // CSS processing
function css() {
  return gulp.src(src + '/styles.sass')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 3,
      errLogToConsole: true
    })
    .on('error', sass.logError))
    .pipe(postcss([
      cssnano
    ]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(build + '/'));
}

var bundleTask = function() {
  return browserify('index.js')
    .transform(babelify, {presets: ["@babel/preset-env"]})
    .transform(svg)
    .transform(require('browserify-css'))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
};

gulp.task('bundle', bundleTask);

exports.css = gulp.series(css);
exports.bundleTask = gulp.series(bundleTask);

// run css and bundle tasks synchronously
exports.build = gulp.series(exports.css, exports.bundleTask);

// watch for file changes
function watch(done) {
  // css changes
  gulp.watch(src + '/styles.sass', css);

  done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.build, exports.watch);
