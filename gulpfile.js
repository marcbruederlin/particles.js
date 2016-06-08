(function() {
  'use strict';
  
  var gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename');
      
  gulp.task('build:full', function() {
    return gulp.src('./src/*')
      .pipe(gulp.dest('./dist/'));
  });
  
  gulp.task('build:compressed', function() {
    return gulp.src('./src/*')
      .pipe(uglify())
      .pipe(rename('jquery.particles.min.js'))
      .pipe(gulp.dest('./dist/'));
  });
  
  gulp.task('build', ['build:full', 'build:compressed']);
}());

