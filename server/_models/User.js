'use strict';

const shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Username is required'
                },
                len: {
                    args: [3, 20],
                    msg: 'Username must be between 3 and 20 charachters length'
                },
                is: {
                    args: /^\S*$/g,
                    msg: 'Username must not contain spaces'
                },
                isUnique: isUnique(User, 'username')
            }
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Email is required'
                },
                isEmail: {
                    args: true,
                    msg: 'Email is not valid'
                },
                isUnique: isUnique(User, 'email')
            }
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeValidate(user) {
                user.username = user.username.toLowerCase();
                user.email = user.email.toLowerCase();
            }
        }
    });

    return User;
};

function isUnique(Model, prop) {
    return function (value, next) {
        Model.count({ where: { [prop]: value } })
            .then(length => {
                const capitalized = prop[0].toLowerCase() + prop.substring(1);
                if (length) { return next(`${capitalized} is already in use`) }
                next();
            })
            .catch(next);
    };
};
