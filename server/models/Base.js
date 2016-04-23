'use strict';

const Promise = require('bluebird');
const pgp = require('pg-promise');
const db = require('../db');
const _ = require('lodash');

const Base = {
    table: '',
    immutableFields: [],
    children: [],
    hiddenFields: [],

    /**
     * @param {Object} props - Props of creating entry.
     * @returns {Promise} - Created entry object.
     */
    create(props) {
        if (!_.isPlainObject(props)) {
            throw new Error('`props` must be an object');
        }

        const columns = _.keys(props).map(k => pgp.as.name(k)).join();
        const values = _.values(props);

        return db.one(
            'INSERT INTO $1~($2^) VALUES($3:csv) RETURNING id',
            [this.table, columns, values]
        ).then(result => this.get(result.id));
    },

    /**
     * @param {Number} id - Entry id.
     * @returns {Promise} - Resolves object of particular entry by given id or array of entries if id is not provided.
     */
    get(id) {
        if (typeof id === 'undefined') {
            return db.query('SELECT * FROM $1~', [this.table]);
        }

        if (!_.isInteger(id)) {
            throw new Error('`id` must be a number');
        }

        return this._isEntryExists(id)
            .then(() => db.oneOrNone(
                'SELECT * FROM $1~ WHERE id = $2', [this.table, id]
            ));
    },

    /**
     * Removes entry by given id.
     * @param {Number} id - Entry id.
     */
    remove(id) {
        if (!_.isInteger(id)) {
            throw new Error('`id` must be a number');
        }

        return this._isEntryExists(id)
            .then(() => db.one(
                'DELETE FROM $1~ WHERE id = $2 RETURNING id', [this.table, id]
            ));
    },

    update(id, props) {
        if (!_.isPlainObject(props)) {
            return Promise.reject('Wrong `props` type');
        }

        const keys = _.keys(props);
        const intersection = _.intersection(keys, this.immutableFields);

        if (intersection.length) {
            return Promise.reject(`${intersection.join()} field's - read only`);
        }

        return this._isEntryExists(id)
            .then(() => {
                const columns = keys.map(k => pgp.as.name(k)).join();
                const values = _.values(props);

                return db.one(
                    `UPDATE $1~ SET ($2^) = ($3:csv)
                     WHERE id = $4
                     RETURNING id
                    `,
                    [this.table, columns, values, id]
                ).then(result => this.get(result.id));
            });
    },

    /**
     * Creates child and relates it with parent entry.
     * @param {Number} id - Parent entry id.
     * @param {Object} childProps - Props of child entry.
     * @param {Object} Child - Child model object.
     * @returns {Promise} - Resolves created child object.
     */
    createChild(id, childProps, Child) {
        return this._isEntryExists(id)
            .then(() => Child.create(childProps))
            .then(child => this._relate(id, child.id, Child.table)
                .then(() => child)
            );
    },

    /**
     * @param {Number} id - Id of parent entry.
     * @returns {Promise} - Array of parent objects or particular object (if id is provided) with all nested children.
     */
    getWithChildren(id) {
        return this.get(id)
            .then(result => {
                if (result instanceof Array) {
                    return Promise.map(result, entry => {
                        return this._getAllChildren(entry.id)
                            .then(children => _.assign({}, entry, children));
                    });
                }

                if (_.isObject(result)) {
                    return this._getAllChildren(id)
                        .then(children => _.assign({}, result, children));
                }
            });
    },

    /**
     * @param {Number} id - Id of parent entry.
     * @returns {Promise} - Resolves object with all nested children of parent entry.
     */
    _getAllChildren(id) {
        return Promise.reduce(this.children, (acc, Child) => {

            return this._getChildEntries(id, Child)
                .then(childEntries => {
                    return _.assign({}, acc, { [Child.table]: childEntries });
                });

        }, {});
    },

    /**
     * @param {Number} id - Id of parent entry.
     * @param {Object} Child - Child model object.
     * @returns {Promise} - Resolves array of all related child entries with all nested children if any.
     */
    _getChildEntries(id, Child) {
        const relationTable = this.table + '_' + Child.table;

        return getTableFields(relationTable)
            .then(fields => {
                const args = [ relationTable, fields[0], fields[1], id ];

                if (isLeaf(Child)) {
                    return this._getChildLeaves.apply(this, [...args, Child.table]);
                }

                return this._getChildTrees.apply(this, [...args, Child]);
            });
    },

    /**
     * @param {String} relationTable - Table name of parent to child relation. For example 'boards_lists'.
     * @param {String} parentIdName - Name of parent entity id column in relation table. For example 'board_id'.
     * @param {String} childIdName - Name of child entity id column in relation table. For example 'list_id'.
     * @param {Number} parentId - Id of parent entry.
     * @param {String} tableName - Child entity table name.
     * @returns {Promise} - Resolves array of related leaves child entries. For example, if parent is List, function will resolve all related cards.
     */
    _getChildLeaves(
        relationTable,
        parentIdName,
        childIdName,
        parentId,
        tableName
    ) {
        return db.query(`
            SELECT a.* FROM $5~ AS a
            JOIN $1~ ON ($2~ = $4 and a.id = $3~)
        `, [relationTable, parentIdName, childIdName, parentId, tableName]);
    },

    /**
     * @param {String} relationTable - Table name of parent to child relation. For example 'boards_lists'.
     * @param {String} parentIdName - Name of parent entity id column in relation table. For example 'board_id'.
     * @param {String} childIdName - Name of child entity id column in relation table. For example 'list_id'.
     * @param {Number} parentId - Id of parent entry.
     * @param {Object} Child - Child model object.
     * @returns {Promise} - Resolves array of related trees child entries with all nested children. For example, if parent is Board, function will resolve all related lists with related cards.
     */
    _getChildTrees(
        relationTable,
        parentIdName,
        childIdName,
        parentId,
        Child
    ) {
        return db.one(`
            SELECT ARRAY (
                SELECT $3~ FROM $1~ WHERE $2~ = $4
            );
        `, [relationTable, parentIdName, childIdName, parentId])
            .then(result => result.array)
            .then(treesIds => Promise.map(treesIds, Child.getWithChildren.bind(Child)))
    },

    _relate(id, childId, childTable) {
        return db.none(
            'INSERT INTO $1~ VALUES($2, $3)',
            [`${this.table}_${childTable}`, id, childId]
        );
    },

    _isEntryExists(id) {
        return db.result('SELECT FROM $1~ WHERE id = $2', [this.table, id])
            .then(result => {
                if (result.rowCount == 0) {
                    const err = new Error(`${this.table} entry does not exists`);

                    err.code = 0;

                    return Promise.reject(err);
                }
            });
    }
};

function getTableFields(table) {
    return db.result('select * from $1~', [table])
        .then(result => _.map(result.fields, field => field.name))
};

function isLeaf(Entity) {
    return !(Entity.children && Entity.children instanceof Array && Entity.children.length);
};

module.exports = Base;
