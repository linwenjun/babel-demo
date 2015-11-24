var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('browserify', function() {
  return browserify({entries: ['src/index.js']})
    .transform('babelify', {presets: ["es2015"]})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'));
})
