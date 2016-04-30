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

        it('should return created user, only with visible fields', () => {
            return User.register(props)
                .then(user => {
                    assert.deepEqual(user, {
                        id: 1,
                        username: props.username
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
        function getMessages(err) {
            return _.reduce(err.validation, (acc, item) => {
                return [...acc, item.message];
            }, []);
        };

        it('should not be rejected if all props are valid', () => {
            return User.validate({
                username: 'johnnnny',
                email: 'test@mail.com',
                password: 123456,
                rePassword: 123456
            }).catch(err => {
                assert.deepEqual(err.validation, []);
            });
        });

        describe('username', () => {
            it('should be rejected, when username is not between 3 and 20 characters', () => {
                return User.validate(_.assign({}, props, {
                    username: 'ab'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must be between 3 and 20 characters long');
                    });
            });

            it('should be rejected, when username contains spaces', () => {
                return User.validate(_.assign({}, props, {
                    username: 'i am john'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must not contain spaces');
                    });

            });

            it('should be rejected, when username is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Username is required');
                    });
            });

            it('should be rejected when username is already exists', () => {
                return db.none(`
                    INSERT INTO users (username, email, hash, salt)
                    VALUES ('test', 'test@mail.com', 'hash', 'salt')
                `).then(() => User.validate({ username: 'test' }))
                    .catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Username is already taken');
                    });
            });
        });

        describe('password', () => {
            it('should be rejected, when password less than 6 characters length', () => {
                return User.validate(_.assign({}, props, {
                    password: 1234,
                    rePassword: 1234
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must be at least 6 characters long');
                    });

            });

            it('should be rejected, when given passwords do not match', () => {
                return User.validate(_.assign({}, props, {
                    rePassword: 1234
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Passwords not match');
                    });

            });

            it('should be rejected, when password is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Password is required');
                    });
            });
        });

        describe('email', () => {
            it('should be rejected, when email is invalid', () => {
                return User.validate(_.assign({}, props, {
                    email: 'not valid email'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Invalid email');
                    });
            });

            it('should be rejected, when email is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Email is required');
                    });
            });

            it('should be rejected when email is already exists', () => {
                return db.none(`
                    INSERT INTO users (username, email, hash, salt)
                    VALUES ('test', 'test@mail.com', 'hash', 'salt')
                `).then(() => User.validate({ email: 'test@mail.com' }))
                    .catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Email is already taken');
                    });
            });
        });
    });

    describe('checkAvailability', () => {
        it('should resolve true, if entry with given prop does not exist', () => {
            return User.checkAvailability('username', 'test')
                .then(isValid => assert.isTrue(isValid));
        });

        it('should resolve false, if entry with given prop exists', () => {
            return db.none(`
                INSERT INTO users (username, email, hash, salt)
                VALUES ('test', 'test@mail.com', 'hash', 'salt')
            `).then(() => {
                return User.checkAvailability('username', 'test')
                    .then(isValid => assert.isNotTrue(isValid));
            });
        });
    });
});
