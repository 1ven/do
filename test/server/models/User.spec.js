import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables, getValidationMessages } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

const userId = shortid.generate();

const props = {
  username: 'test2',
  email: 'test2@mail.com',
  password: 123456,
  confirmation: 123456,
};

describe('User', () => {
  beforeEach(() => recreateTables().then(setup));

  describe('findByUsername', () => {
    it('should return user by given id', () => {
      return User.findByUsername('test')
        .then(user => {
          assert.deepEqual(user, {
            id: userId,
            username: 'test',
          });
        });
    });

    it('should return user with additional fields when, `extraFields` parameter is provided', () => {
      return User.findByUsername('test', ['hash', 'salt'])
        .then(user => {
          assert.property(user, 'hash');
          assert.property(user, 'salt');
          assert.deepEqual(_.omit(user, ['hash', 'salt']), {
            id: userId,
            username: 'test',
          });
        });
    });
  });

  describe('create', () => {
    it('should create user', () => {
      return User.create(props)
        .then(user => {
          return db.one('SELECT * FROM users WHERE id = $1', [user.id]);
        })
        .then(user => {
          assert.property(user, 'id');
          assert.property(user, 'hash');
          assert.property(user, 'salt');
          assert.property(user, 'created_at');

          assert.isTrue(shortid.isValid(user.id));
          assert.match(user.hash, /^[a-f0-9]{32}$/g);

          assert.deepEqual({
            username: user.username,
            email: user.email,
            index: user.index,
          }, {
            username: props.username,
            email: props.email,
            index: 2,
          });
        });
    });

    it('should return created user, only with id, username', () => {
      return User.create(props)
        .then(user => {
          assert.property(user, 'id');
          assert.deepEqual(_.omit(user, ['id']), {
            username: props.username,
          });
        });
    });
  });

  describe('sanitize', () => {
    it('should convert to lowercase `email` and `username`', () => {
      const sanitized = User.sanitize(_.assign({}, props, {
        username: 'tEsT2',
        email: 'tEsT2@mail.CoM',
      }));
      assert.deepEqual(sanitized, props);
    });
  });

  describe('validate', () => {
    it('should not be rejected if all props are valid', () => {
      return User.validate({
        username: 'johnnnny',
        email: 'test@mail.com',
        password: 123456,
        confirmation: 123456,
      })
        .catch(err => {
          assert.deepEqual(err.validation, []);
        });
    });

    describe('username', () => {
      it('should be rejected when username is already exists', () => {
        const id = shortid.generate();
        return db.none(
          `INSERT INTO users (id, username, email, hash, salt)
          VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')`,
          [id]
        )
          .then(() => User.validate({ username: 'someuser' }))
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Username is already taken');
          });
      });
    });

    describe('password', () => {
      it('should be rejected, when password less than 6 characters length', () => {
        return User.validate(_.assign({}, props, {
          password: 1234,
          confirmation: 1234,
        }))
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Must be at least 6 characters long');
          });
      });

      it('should be rejected, when password is not provided', () => {
        return User.validate({})
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Password is required');
          });
      });
    });

    describe('confirmation', () => {
      it('should be rejected, when given passwords do not match', () => {
        return User.validate(_.assign({}, props, {
          confirmation: 1234,
        }))
        .catch(getValidationMessages)
        .then(messages => {
          assert.include(messages, 'Passwords not match');
        });
      });

      it('should be rejected, when password confirmation is not provided', () => {
        return User.validate({})
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Password confirmation is required');
          });
      });
    });

    describe('email', () => {
      it('should be rejected when email is already exists', () => {
        const id = shortid.generate();
        return db.none(
          `INSERT INTO users (id, username, email, hash, salt)
          VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')`,
          [id]
        )
          .then(() => User.validate({ email: 'someuser@mail.com' }))
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Email is already taken');
          });
      });
    });
  });

  describe('checkAvailability', () => {
    it('should resolve true, if entry with given prop does not exist', () => {
      return User.checkAvailability('username', 'someuser')
        .then(isValid => assert.isTrue(isValid));
    });

    it('should resolve false, if entry with given prop exists', () => {
      const id = shortid.generate();
      return db.none(
        `INSERT INTO users (id, username, email, hash, salt)
        VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')`,
        [id]
      )
        .then(() => {
          return User.checkAvailability('username', 'someuser')
            .then(isValid => assert.isNotTrue(isValid));
        });
    });
  });

    describe('findById', () => {
      it('should return user by given id', () => {
        return User.findById(userId)
          .then(user => {
            assert.property(user, 'avatar');
            assert.deepEqual(_.omit(user, ['avatar']), {
              id: userId,
              username: 'test',
            });
          });
      });
    });
});

function setup() {
  return db.none(
    `INSERT INTO users (id, username, email, hash, salt)
    VALUES ($1, 'test', 'test@test.com', 'hash', 'salt')`,
    [userId]
  );
}
