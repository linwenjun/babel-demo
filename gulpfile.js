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

gulp.task('default', function(done) {
  glob('src/*.js', function(err, files) {
    if(err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({
          entries: [entry],
          debug: true
        })
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        // .pipe(rename({
        //   extname: '.bundle.js'
        // }))
        .pipe(gulp.dest('dist'));
    })
    es.merge(tasks).on('end', done);
  })
})
