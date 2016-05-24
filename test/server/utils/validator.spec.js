import { assert } from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import validator from 'server/utils/validator';

describe('validator', () => {
    describe('_flattenChecks', () => {
        const props = { user: 'test' };

        it('should throw error, when checks of a particular property are not array', () => {
            const fn = () => validator._flattenChecks(props, { user: null });
            assert.throws(fn, /must have an array type/);
        });

        it('should return `[]`, when `checksObj = {}`', () => {
            const result = validator._flattenChecks(props, {})
            assert.deepEqual(result, []);
        });

        it('should return flat array with checks, putting name inside `check` object', () => {
            const checksObj = {
                user: [
                    {
                        assert: () => true,
                        message: 'test'
                    }
                ]
            };
            const flatChecks = validator._flattenChecks(props, checksObj);
            assert.deepEqual(flatChecks, [_.assign({}, checksObj.user[0], {
                name: 'user',
                value: 'test'
            })]);
        });
    });

    describe('_getErrorInfo', () => {
        it('should return object with error info by given `check`', () => {
            const check = {
                name: 'user',
                assert: () => true,
                message: 'test'
            };
            const errorInfo = validator._getErrorInfo(check); 
            assert.deepEqual(errorInfo, {
                name: check.name,
                message: check.message,
            });
        });
    });

    describe('_makeCheck', () => {
        function getCheck(assert) {
            return {
                name: 'username',
                message: 'test message',
                assert
            };
        };

        const expectedError = {
            name: 'username',
            message: 'test message'
        };

        it('should resolve error info, when `assert` function has returned false', () => {
            const check = getCheck(() => false);
            return validator._makeCheck(check)
                .then(error => {
                    assert.deepEqual(error, expectedError);
                });
        });

        it('should resolve `null`, when `assert` function has returned true', () => {
            const check = getCheck(() => true);
            return validator._makeCheck(check)
                .then(error => {
                    assert.isNull(error);
                });
        });

        it('should resolve error info, when `assert` function returned promise and it resolved false', () => {
            const check = getCheck(() => Promise.resolve(false));
            return validator._makeCheck(check)
                .then(error => {
                    assert.deepEqual(error, expectedError);
                });
        });

        it('should resolve `null`, when `assert` function has returned promise and it resolved true', () => {
            const check = getCheck(() => Promise.resolve(true));
            return validator._makeCheck(check)
                .then(error => {
                    assert.isNull(error);
                });
        });
    });

    describe('_handleErrors', () => {
        it('should throw error with title `Validation error` and property errors when errors array is provided', () => {
            const errors = [{
                name: 'username',
                message: 'Username is required'
            }];
            const fn = () => validator._handleErrors(errors);
            assert.throws(fn, /Validation error/);
        });

        it('should not throw error when errors array is not provided', () => {
            const fn = () => validator._handleErrors();
            assert.doesNotThrow(fn);
        });

        it('should not throw error when provided errors array is empty', () => {
            const fn = () => validator._handleErrors([]);
            assert.doesNotThrow(fn);
        });
    });

    describe('_makeValidation', () => {
        it('should resolve array with errors, when checks are not valid', () => {
            const expectedErrors = [
                {
                    name: 'username',
                    message: 'Username is required'
                },
                {
                    name: 'email',
                    message: 'Email is required'
                }
            ];
            const checks = [
                {
                    assert: value => !! value,
                    message: 'Username is required',
                    name: 'username',
                },
                {
                    assert: value => !! value,
                    message: 'Email is required',
                    name: 'email',
                }
            ];
            return validator._makeValidation(checks)
                .then(errors => {
                    assert.deepEqual(errors, expectedErrors);
                });
        });

        it('should not run next assertion, if first assertion of this prop is failed', () => {
            const expectedErrors = [
                {
                    name: 'username',
                    message: 'Username is required'
                }
            ];
            const checks = [
                {
                    assert: value => !! value,
                    message: 'Username is required',
                    name: 'username',
                },
                {
                    assert: value => value.length >= 3 && value.length <= 20,
                    message: 'Must be between 3 and 20 characters long',
                    name: 'username',
                }
            ];
            return validator._makeValidation(checks)
                .then(errors => {
                    assert.deepEqual(errors, expectedErrors);
                });
        });
    });

    describe('validate', () => {
        it('should throw error, when passed `props` have wrong type', () => {
            const fn = () => validator.validate(null, {});
            assert.throws(fn, /`props` must be.*object/);
        });

        it('should throw error, when passed `checksObj` have wrong type', () => {
            const fn = () => validator.validate({}, null);
            assert.throws(fn, /`checksObj` must be.*object/);
        });

        /* it('should resolve `[]`, when `checksObj = {}`', () => { */
        /*     return validator.validate({}, {}) */
        /*         .then(errors => { */
        /*             assert.deepEqual(errors, []); */
        /*         }); */
        /* }); */
    });
});
