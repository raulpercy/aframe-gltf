(function() {
  'use strict';

  let gulp = require('gulp'),
      del = require('del'),
      concat = require('gulp-concat'),
      jshint = require('gulp-jshint'),
      typescript = require('gulp-typescript'),
      uglify = require('gulp-uglify'),
      connect = require('gulp-connect'),
      scripts = [
        './bower_components/three.js/examples/js/loaders/gltf/glTF-parser.js',
        './bower_components/three.js/examples/js/loaders/gltf/glTFLoaderUtils.js',
        './bower_components/three.js/examples/js/loaders/gltf/glTFLoader.js',
        './bower_components/three.js/examples/js/loaders/gltf/glTFAnimation.js',
        './bower_components/three.js/examples/js/loaders/gltf/glTFShaders.js',
        './build/src.js'
      ];

  function clean() {
    return del.sync(['build', 'dist']); 
  }

  function src() {
    return gulp.src('src/main.ts')
      .pipe(typescript({
        noImplicityAny: true,
        out: 'src.js'
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(gulp.dest('build'))
  }

  function main() {
    return gulp.src(scripts)
      .pipe(concat('aframe-gltf.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('demo'));
  }

  function min() {
    return gulp.src(scripts)
      .pipe(uglify({
        mangle: true
      }))
      .pipe(concat('aframe-gltf.min.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('demo'));
  }

  function demo() {
    connect.server({
      port: 9000,
      host: '0.0.0.0',
      root: 'demo',
      livereload: false
    });
  }

  function watch() {
    gulp.watch('src/*.ts', ['main', 'min']);
  }

  gulp.task('clean', clean);
  gulp.task('src', src);
  gulp.task('main', ['src'], main);
  gulp.task('min', ['src'], min);
  gulp.task('demo', demo);
  gulp.task('watch', watch);

  gulp.task('build', ['clean', 'main', 'min']);
  gulp.task('default', ['clean', 'main', 'min', 'demo', 'watch']);
})();
