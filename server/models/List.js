'use strict';

const shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    const List = sequelize.define('List', {
        id: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'List title must not be empty'
                }
            }
        }
    }, {
        classMethods: {
            associate(models) {
                List.hasMany(models.Card);
            }
        }
    });

    return List;
};
