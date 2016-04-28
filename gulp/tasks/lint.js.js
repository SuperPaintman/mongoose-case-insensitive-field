'use strict';
/** Requires */
// Main
const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();

// Config
const config        = require('../config.js');
const helps         = require('../helps.js');

/** Constants */
const TASK_NAME = 'lint:js';
const WATCH_TASK_NAME = `watch:${TASK_NAME}`;

module.exports.TASK_NAME = TASK_NAME;
module.exports.WATCH_TASK_NAME = WATCH_TASK_NAME;

/** Task */
gulp.task(TASK_NAME, () => {
  return gulp.src(config.paths.lint.js.from)
    // Error handler
    .pipe($.plumber({
      errorHandler: helps.onError
    }))

    // Eslint
    .pipe($.eslint(config.eslint))
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())

    ;
});

/** Watch */
gulp.task(WATCH_TASK_NAME, () => {
  return gulp.watch(config.paths.lint.js.watch, [TASK_NAME]);
});
