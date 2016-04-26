import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import { recreateTables } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

chai.use(chaiAsPromised);

describe('User model', () => {
    beforeEach(recreateTables);

    const props = {
        username: 'test',
        email: 'test@mail.com',
        password: 123456,
        rePassword: 123456
    };

    describe('register', () => {
        it('should create user', () => {
            return User.register(props)
                .then(() => {
                    return db.one('SELECT * FROM users WHERE id = 1');
                })
                .then(user => {
                    assert.property(user, 'hash');
                    assert.property(user, 'salt');

                    delete user.hash;
                    delete user.salt;

                    assert.deepEqual(user, {
                        id: 1,
                        username: props.username,
                        email: props.email
                    });
                });
        });
    });

    describe('sanitize', () => {
        it('should convert to lowercase `email` and `username`', () => {
            const sanitized = User.sanitize(_.assign({}, props, {
                username: 'tEsT',
                email: 'tEsT@mail.CoM'
            }));
            assert.deepEqual(sanitized, props);
        });
    });

    describe('validate', () => {
        describe('username', () => {
            it('should be rejected, when username is not between 3 and 20 characters', () => {
                return User.validate(_.assign({}, props, {
                    username: 'ab'
                })).catch(err => assert.match(err.validation[0].message, /between 3 and 20/));
            });

            it('should be rejected, when username contains spaces', () => {
                return User.validate(_.assign({}, props, {
                    username: 'i am john'
                })).catch(err => assert.match(err.validation[0].message, /not contain spaces/));
            });
        });

        describe('password', () => {
            it('should be rejected, when password less than 6 characters length', () => {
                return User.validate(_.assign({}, props, {
                    password: 1234,
                    rePassword: 1234
                })).catch(err => assert.match(err.validation[0].message, /at least 6/));
            });

            it('should be rejected, when given passwords do not match', () => {
                return User.validate(_.assign({}, props, {
                    rePassword: 1234
                })).catch(err => assert.match(err.validation[0].message, /not match/));
            });
        });

        describe('email', () => {
            it('should be rejected, when email is invalid', () => {
                return User.validate(_.assign({}, props, {
                    email: 'not valid email'
                })).catch(err => assert.match(err.validation[0].message, /Invalid email/));
            });
        });
    });

    describe('isUsernameFree', () => {
        it('should resolve true, if username is free', () => {
            return User.isUsernameFree('test')
                .then(isValid => assert.isTrue(isValid));
        });

        it('should resolve false, if username is not free', () => {
            return db.none(`
                INSERT INTO users (username, email, hash, salt)
                VALUES ('test', 'test@mail.com', 'hash', 'salt')
            `).then(() => {
                return User.isUsernameFree('test')
                    .then(isValid => assert.isNotTrue(isValid));
            });
        });
    });
});
