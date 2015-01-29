var gulp = require('gulp');
var browserify = require('browserify');
var to5ify = require('6to5ify');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build:todo', function() {
  browserify('./src/app.js', { debug: true })
  .add(require.resolve('6to5/polyfill'))
  .transform(to5ify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('todo.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify({ mangle: false }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src'));
});

gulp.task('default', ['build:todo']);
