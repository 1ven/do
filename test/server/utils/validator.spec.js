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

        it('should return flat array with checks, putting name and value inside `check` object', () => {
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
                value: 'test',
                name: 'user'
            })]);
        });
    });

    describe('_getErrorInfo', () => {
        it('should return object with error info by given `check`', () => {
            const check = {
                name: 'user',
                value: 'test',
                assert: () => true,
                message: 'test'
            };
            const errorInfo = validator._getErrorInfo(check); 
            assert.deepEqual(errorInfo, {
                name: check.name,
                message: check.message,
                value: check.value
            });
        });
    });

    describe('validate', () => {
        const props = {
            username: 'test'
        };

        function getChecksObj (assert) {
            return {
                username: [
                    {
                        message: 'test message',
                        assert
                    }
                ]
            };
        };

        const expectedErrors = [
            {
                message: 'test message',
                name: 'username',
                value: 'test'
            }
        ];

        it('should throw error, when passed `props` have wrong type', () => {
            const fn = () => validator.validate(null, {});
            assert.throws(fn, /`props` must be.*object/);
        });

        it('should throw error, when passed `checksObj` have wrong type', () => {
            const fn = () => validator.validate({}, null);
            assert.throws(fn, /`checksObj` must be.*object/);
        });

        it('should set field as invalid, where `assert` function returned false', () => {
            const checksObj = getChecksObj(() => false);
            return validator.validate(props, checksObj)
                .then(errors => {
                    assert.deepEqual(errors, expectedErrors);
                });
        });

        it('should set field as valid, where `assert` function returned true', () => {
            const checksObj = getChecksObj(() => true);
            return validator.validate(props, checksObj)
                .then(errors => {
                    assert.deepEqual(errors, []);
                });
        });

        it('should set field as invalid, where `assert` function is promise and it resolved false', () => {
            const checksObj = getChecksObj(() => Promise.resolve(false));
            return validator.validate(props, checksObj)
                .then(errors => {
                    assert.deepEqual(errors, expectedErrors);
                });
        });

        it('should set field as valid, where `assert` function is promise and it resolved true', () => {
            const checksObj = getChecksObj(() => Promise.resolve(true));
            return validator.validate(props, checksObj)
                .then(errors => {
                    assert.deepEqual(errors, []);
                });
        });

        it('should resolve `[]`, when `checksObj = {}`', () => {
            return validator.validate(props, {})
                .then(errors => {
                    assert.deepEqual(errors, []);
                });
        });
    });
});
