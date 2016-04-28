'use strict';
/** Requires */
// Main
const gulp          = require('gulp');
const del           = require('del');

// Config
const config        = require('../config.js');

/** Constants */
const TASK_NAME = 'clear';

module.exports.TASK_NAME = TASK_NAME;

/** Task */
gulp.task(TASK_NAME, () => {
  return Promise.all([
    del(`${config.folders.module.build}/**`)
  ]);
});
