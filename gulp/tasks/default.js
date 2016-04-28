'use strict';
/** Requires */
// Main
const gulp          = require('gulp');

/** Constants */
const TASK_NAME = 'default';

module.exports.TASK_NAME = TASK_NAME;

/** Task */
gulp.task(TASK_NAME, [
  require('./module.js.js').TASK_NAME
]);
