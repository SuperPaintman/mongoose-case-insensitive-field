'use strict';
/** Requires */
// Main
const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();

// Config
const config        = require('../config.js');
const helps         = require('../helps.js');

/** Constants */
const TASK_NAME = 'module:js';
const WATCH_TASK_NAME = `watch:${TASK_NAME}`;

module.exports.TASK_NAME = TASK_NAME;
module.exports.WATCH_TASK_NAME = WATCH_TASK_NAME;

/** Task */
gulp.task(TASK_NAME, () => {
  return gulp.src(config.paths.module.js.from)
    // Error handler
    .pipe($.plumber({
      errorHandler: helps.onError
    }))

    // Source map
    .pipe($.sourcemaps.init())

    // Babel render
    .pipe($.babel(config.babel))

    //End source map
    .pipe($.sourcemaps.write())

    // Сохранение
    .pipe(gulp.dest(config.paths.module.js.to))

    ;
});

/** Watch */
gulp.task(WATCH_TASK_NAME, () => {
  return gulp.watch(config.paths.module.js.watch, [TASK_NAME]);
});
