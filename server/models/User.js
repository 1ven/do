const _ = require('lodash');
const crypto = require('crypto');
const shortid = require('shortid');
const validator = require('../utils/validator');
const db = require('../db');

const User = {
  findByUsername(username, extraFields) {
    const extra = extraFields ? `, ${extraFields.join(', ')}`: '';
    return db.one(
      `SELECT id, username ${extra}
      FROM users WHERE username = $1`,
      [username]
    );
  },

  findById(userId) {
    return db.one(
      `SELECT id, username, avatar FROM users WHERE id = $1`,
      [userId]
    );
  },

  create(props) {
    const _props = this.sanitize(props);
    return this.validate(_props)
      .then(() => {
        const id = shortid.generate();
        const salt = Math.random() + '';
        const hash = this.encryptPassword(_props.password, salt);

        return db.one(
          `INSERT INTO users (id, username, email, hash, salt)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, username`,
          [id, _props.username, _props.email, hash, salt]
        );
      });
  },

  encryptPassword(password, salt) {
    return crypto.createHash('md5').update(password + salt).digest('hex');
  },

  isValidPassword(hash, salt, givenPassword) {
    return hash === this.encryptPassword(givenPassword, salt);
  },

  validate(props) {
    return validator.validate(props, {
      username: [
        {
          assert: value => !! value,
          message: 'Username is required',
        },
        {
          assert: value => value.length >= 3 && value.length <= 20,
          message: 'Must be between 3 and 20 characters long',
        },
        {
          assert: value => !! value.match(/^\S*$/g),
          message: 'Must not contain spaces',
        },
        {
          assert: value => this.checkAvailability('username', value),
          message: 'Username is already taken',
        },
      ],
      password: [
        {
          assert: value => !! value,
          message: 'Password is required',
        },
        {
          assert: value => value.length >= 6,
          message: 'Must be at least 6 characters long',
        },
      ],
      confirmation: [
        {
          assert: value => !! value,
          message: 'Password confirmation is required',
        },
        {
          assert: value => value === props.password + '',
          message: 'Passwords not match',
        },
      ],
      email: [
        {
          assert: value => !! value,
          message: 'Email is required',
        },
        {
          assert: value => !! value.match(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/g),
          message: 'Invalid email',
        },
        {
          assert: value => this.checkAvailability('email', value),
          message: 'Email is already taken',
        },
      ],
    });
  },

  sanitize(props) {
    const username = (props.username || '').toLowerCase();
    const email = (props.email || '').toLowerCase();
    return _.assign({}, props, {
      username,
      email,
    });
  },

  checkAvailability(prop, value) {
    return db.result(
      `SELECT id FROM users WHERE $1~ = $2`,
      [prop, value]
    )
      .then(result => !result.rowCount);
  },

  isExists(prop, value) {
    return db.one(
      `SELECT EXISTS (
        SELECT id FROM users WHERE $1~ = $2
      )`,
      [prop, value]
    )
      .then(result => result.exists);
  },
};

module.exports = User;
