var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var glob = require('glob');
var rename = require('gulp-rename');
var es = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var rename = require('gulp-rename');


gulp.task('browserify', function(done) {
  var entry = 'src/app.js';

  var opts = {
    entries: [entry],
    debug: true,
    plugin: [watchify],
    delay: 100,
    ignoreWatch: ['**/node_modules/**'],
    poll: false
  };

  var b = browserify(opts).transform('babelify', {presets: ['es2015', 'react']})

  b.on('update', bundle);

  function bundle() {
    var start = new Date().getTime();
    console.log("Starting 'browserify'...");
    return b.bundle()
      .pipe(source(entry))
      .pipe(buffer())
      .pipe(rename(function(path) {
        path.dirname = "";
      }))
      // .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
      .on('end', function() {
        console.log("Finished 'browserify' after" + (new Date().getTime() - start) + 'ms');
      })
  }

  bundle().on('end', done);
})

var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('index.html')
      .pipe(connect.reload());
})

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js'], ['browserify']);
})

gulp.task('watch-scripts', function() {
  gulp.watch(['./dist/src/app.js'], ['html']);
})

gulp.task('default', ['watch', 'watch-scripts', 'connect']);
