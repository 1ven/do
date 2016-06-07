'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

module.exports = {
  validate(props, checksObj) {
    if (!_.isPlainObject(props)) {
      throw new Error('`props` must be a plain object');
    }

    if (!_.isPlainObject(checksObj)) {
      throw new Error('`checksObj` must be a plain object');
    }

    const checks = this._flattenChecks(props, checksObj);

    return this._makeValidation(checks).then(this._handleErrors);
  },

  _makeValidation(checks) {
    return Promise.reduce(checks, (acc, check) => {
      const isNameInArray = _.filter(acc, item => item.name === check.name).length === 1;

      if (isNameInArray) { return acc; }

      return this._makeCheck(check)
        .then(error => error ? [...acc, error] : acc);
    }, []);
  },

  _handleErrors(errors) {
    if (errors && errors.length) {
      const err = new Error('Validation error');
      err.validation = errors;
      throw err;
    }
  },

  _makeCheck(check) {
    if (typeof check.assert !== 'function') {
      throw new Error(`Assertion for \`${check.message}\` must be a function`);
    }

    let value = check.value;

    if (typeof value === 'number') {
      value = value + '';
    } else if (typeof value !== 'string') {
      value = '';
    }

    const isValid = check.assert(value);
    const errorInfo = this._getErrorInfo(check);

    if (typeof isValid.then === 'function') {
      return isValid.then(result => !result ? errorInfo : null);
    }

    return Promise.resolve(
      !isValid ? errorInfo : null
    );
  },

  _getErrorInfo(check) {
    return {
      name: check.name,
      message: check.message,
    };
  },

  _flattenChecks(props, checksObj) {
    return _.reduce(checksObj, (acc, propChecks, name) => {
      if (! (propChecks instanceof Array)) {
        throw new Error('Check of a particular property, must have an array type');
      }

      const assignedPropChecks = _.map(propChecks, check => {
        return _.assign({}, check, {
          value: props[name],
          name,
        });
      });

      return [...acc, ...assignedPropChecks];
    }, []);
  },
};
