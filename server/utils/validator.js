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

        return Promise.map(checks, check => {
            if (typeof check.assert !== 'function') {
                throw new Error(`Assertion for \`${check.message}\` must be a function`);
            }

            const isValid = check.assert(check.value + '');
            const errorInfo = this._getErrorInfo(check);

            if (typeof isValid.then === 'function') {
                return isValid.then(result => !result ? errorInfo : false);
            }

            if (!isValid) { return errorInfo; }

            return false;
        }).then(_.filter);
    },

    _getErrorInfo(check) {
        return {
            name: check.name,
            message: check.message,
            value: check.value
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
                    name
                });
            });
            return [...acc, ...assignedPropChecks];
        }, []);
    }
};
