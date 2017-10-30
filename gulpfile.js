(function() {
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      argv = require('yargs').argv,
      clean = require('gulp-clean'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename');

  gulp.task('jshint', function() {
    return gulp.src('./src/*')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('build:clean', function() {
    return gulp.src(['./dist'])
      .pipe(clean({force: true}));
  });

  gulp.task('build:full', ['build:clean'], function() {
    return gulp.src('./src/*')
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('build:compressed', ['build:full'], function() {
    return gulp.src('./src/*')
      .pipe(uglify({
        output: {
          comments: 'some'
        }
      }))
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/'));
  });

  if(argv.watch) {
    gulp.watch('./src/*', ['build']);
  }

  gulp.task('build', ['jshint', 'build:clean', 'build:full', 'build:compressed']);
}());
