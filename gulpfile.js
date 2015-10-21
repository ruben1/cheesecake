var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var options = {
  src: 'src',
  dist: 'dist'
}

gulp.task('browserify-dev', function() {
  var b = browserify(
    './src/index.js'
  );

  return b.bundle()
    .pipe(source('cheesecake.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-prod', function() {
  var b = browserify({
    entries: './src/index.js'
  });

  return b.bundle()
    .pipe(source('cheesecake.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-dev', ['browserify-dev'])
gulp.task('build-prod', ['browserify-prod']);
gulp.task('build', ['build-dev', 'build-prod']);
gulp.task('default', ['build']);
