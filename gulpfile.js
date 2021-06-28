'use strict';

const { gulp, series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
sass.compiler = require('node-sass');

const browserSync = require("browser-sync").create();

const paths = {
  src : {
    html : './src/*.html',
    scss : './src/scss/**/*.scss',
    scripts : './src/scripts/**/*.js',
  },
  dist : {
    html : 'dist/',
    css : 'dist/styles',
    scripts : 'dist/scripts',
  },
}


function babelJS (){
  return src(paths.src.scripts)
    .pipe(babel())
    .pipe(dest(paths.dist.scripts))
    .pipe(browserSync.stream());
}

function compileSass() {
   return src(paths.src.scss)
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist/styles'))
  .pipe(browserSync.stream());
}

function copyHtml() {
  return src(paths.src.html)
  .pipe(dest(paths.dist.html));
}

function watcher() {
  watch(paths.src.html, copyHtml);
  watch('src/scripts/*.js', babelJS);
  watch('src/scss/**/*.scss', compileSass);
}

exports.build = series(watcher);