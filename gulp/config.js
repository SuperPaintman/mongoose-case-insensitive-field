'use strict';
/** Requires */
const fs            = require('fs');
const path          = require('path');

// Utils
const yaml          = require('js-yaml');

/** Constants */
const babelConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), './.babelrc')).toString()
);

const eslintConfig = yaml.load(
  fs.readFileSync(path.join(process.cwd(), './.eslintrc.yml')).toString()
);

const folders = {
  module: {
    build: 'bin',
    source: 'development'
  }
};

const paths = (function () {
  const $p = {};

  /** Module */
  $p.module = {};
  // js
  $p.module.js = {};
  $p.module.js.from   = `./${folders.module.source}/**/*.js`;
  $p.module.js.watch  = `./${folders.module.source}/**/*.js`;
  $p.module.js.to     = `./${folders.module.build}/`;

  /** Lint */
  $p.lint = {};
  // js
  $p.lint.js = {};
  $p.lint.js.from = [
    `./${folders.module.source}/**/*.js`,
    './gulp/**/*.js',
    './gulpfile.js'
  ];
  $p.lint.js.watch = $p.lint.js.from;

  return $p;
})();

module.exports = {
  folders: folders,

  paths: paths,

  babel: babelConfig,

  eslint: eslintConfig
};
