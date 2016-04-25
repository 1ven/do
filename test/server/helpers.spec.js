import { assert } from 'chai';
import { validate } from 'server/helpers';

describe('helpers', () => {
    describe('validate', () => {
        const fields = {
            username: [{
                assert: value => value.length > 3,
                message: 'username must be more than 3 characters length'
            }]
        };

        it('should return array with errors, when props are not valid', () => {
            const props = {
                username: 'ab'
            };
            const errors = validate(props, fields);
            assert.deepEqual(errors, [
                {
                    name: 'username',
                    value: props.username,
                    message: fields.username[0].message
                }
            ]);
        });

        it('should return empty array, when props are valid', () => {
            const props = {
                username: 'john'
            };
            const errors = validate(props, fields);
            assert.deepEqual(errors, []);
        });
    });
});
