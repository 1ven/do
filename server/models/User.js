'use strict';

const _ = require('lodash');
const crypto = require('crypto');
const Promise = require('bluebird');
const validator = require('../utils/validator');
const Base = require('./Base');
const db = require('../db');

const User = _.assign({}, Base, {
    table: 'users',
    mutableFields: ['email'],
    visibleFields: ['id', 'username'],

    register(props) {
        const _props = this.sanitize(props);
        return this.validate(props)
            .then(() => {
                const salt = Math.random() + '';
                const hash = this.encryptPassword(_props.password, salt);

                delete _props.password;
                delete _props.rePassword;

                return this.create(_.assign({}, _props, {
                    hash,
                    salt
                }));
            });
    },

    encryptPassword(password, salt) {
        return crypto.createHash('md5').update(password + salt).digest('hex');
    },

    sanitize(props) {
        const username = props.username.toLowerCase();
        const email = props.email.toLowerCase();
        return _.assign({}, props, {
            username,
            email
        });
    },

    validate(props) {
        return validator.validate(props, {
            username: [
                {
                    assert: value => value.length >= 3 && value.length <= 20,
                    message: 'Must be between 3 and 20 characters long'
                },
                {
                    assert: value => !! value.match(/^\S*$/g),
                    message: 'Must not contain spaces'
                },
                {
                    assert: this.isUsernameFree,
                    message: 'Username is already taken'
                }
            ],
            password: [
                {
                    assert: value => value.length >= 6,
                    message: 'Must be at least 6 characters long'
                }
            ],
            rePassword: [
                {
                    assert: value => value === props.password + '',
                    message: 'Passwords not match'
                }
            ],
            email: [
                {
                    assert: value => !! value.match(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/g),
                    message: 'Invalid email'
                }
            ]
        }).then(errors => {
            if (errors.length) {
                const err = new Error('Validation error');
                err.validation = errors;
                throw err;
            }
        });
    },

    isUsernameFree(username) {
        return db.result(`
            SELECT id FROM users WHERE username = $1
        `, username).then(result => !result.rowCount);
    }
});

module.exports = User;
