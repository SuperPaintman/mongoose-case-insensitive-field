'use strict';
/** Requires */
import _          from 'lodash';

/** Init */
export default function caseInsensitiveField(schema, options) {
  options = _.merge({
    prefix: '__',
    suffix: '',
    select: false,
    paths: [],
    usePathOption: true
  }, options);

  /** Transform string to */
  if (options.paths && _.isString(options.paths)) {
    options.paths = options.paths
      .split(',')
      .map((s) => s.trim());
  }

  /**
   * Create pathname for case-insensitive path
   * @param  {String} schemaPath
   * @return {String}
   *
   * @private
   */
  function _createCaseInsensitivePath(schemaPath) {
    return `${options.prefix}${schemaPath}${options.suffix}`;
  }

  function _clonePath(fromPath, toPath) {
    schema.paths[toPath]  = _.cloneDeep(schema.paths[fromPath]);
    schema.tree[toPath]   = _.cloneDeep(schema.tree[fromPath]);

    schema.paths[toPath].path = toPath;
  }

  _.forEach(schema.paths, (value, key) => {
    const isValidPath = (options.usePathOption && value.options && value.options.caseInsensitive)
                      || (options.paths && !!_.find(options.paths, (p) => p === key));

    if (!isValidPath) {
      return;
    }

    const caseInsensitivePath = _createCaseInsensitivePath(key);

    /** Check if case insensitive path already used */
    if (schema.paths[caseInsensitivePath] !== undefined) {
      throw new Error(`It is impossible to create a case-insensitive path "${key}". Path "${caseInsensitivePath}" already used.`);
    }

    /** Clone path */
    _clonePath(key, caseInsensitivePath);

    /** Patch new path */
    // LowerCase    
    schema.path(caseInsensitivePath).lowercase(true);

    // Select
    schema.path(caseInsensitivePath).select(options.select);

    /** Set value */
    ['validate'].forEach((method) => {
      schema.pre(method, function (next) {
        try {
          this[caseInsensitivePath] = this[key].toLowerCase();
        } catch (err) {
          return next(err);
        }
        next();
      });
    });

    /** Patch find and findOne methods */
    ['find', 'findOne'].forEach((method) => {
      schema.pre(method, function (next) {
        if (this._conditions[key] !== undefined) {
          this._conditions[caseInsensitivePath] = this._conditions[key].toLowerCase();
    
          delete this._conditions[key];
        }
    
        next();
      });
    });
  });
}
