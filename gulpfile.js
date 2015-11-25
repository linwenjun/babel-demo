var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var glob = require('glob');
var rename = require('gulp-rename');
var es = require('event-stream');

gulp.task('default', function(done) {
  glob('src/*.js', function(err, files) {
    if(err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({entries: [entry]})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          extname: '.bundle.js'
        }))
        .pipe(gulp.dest('dist'));
    })
    es.merge(tasks).on('end', done);
  })
})

gulp.task('browserify', function() {
  return browserify({entries: ['src/index.js']})
    .transform('babelify', {presets: ["es2015"]})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'));
})
