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

gulp.task('browserify', function(done) {
  glob('src/app.js', function(err, files) {
    if(err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({
          entries: [entry],
          debug: true
        })
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
    })
    es.merge(tasks).on('end', done);
  })
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
