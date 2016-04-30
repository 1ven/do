'use strict';

const Promise = require('bluebird');
const pgp = require('pg-promise');
const db = require('../db');
const _ = require('lodash');

const Base = {
    table: '',
    mutableFields: [],
    visibleFields: [],
    children: [],

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
        ).then(result => this.getOne({ id: result.id }));
    },

    /**
     * @param {Object} props - Query props.
     * @returns {Promise} - Resolves array of entries by given props.
     */
    get(props) {
        props = typeof props !== 'undefined' ? props : {};

        if (!_.isPlainObject(props)) {
            throw new Error('`props` must be an object');
        }

        const columns = _.keys(props).map(k => pgp.as.name(k));
        const values = _.values(props).map(v => pgp.as.text(v));

        let conditions = columns.reduce((acc, column, i) => {
            const end = i !== columns.length - 1 ? ' AND ' : '';
            return acc + column + ' = ' + values[i] + end;
        }, '');

        conditions = conditions.length ? conditions : 'true';

        return db.any(`SELECT * FROM $1~ WHERE $2^`, [this.table, conditions])
            .then(this._filterEntries.bind(this));
    },

    getOne(props) {
        return this.get(props)
            .then(this._getFirst.bind(this));
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
        const difference = _.difference(keys, this.mutableFields);

        if (difference.length) {
            return Promise.reject(`You can't update [${difference.join()}] field's`);
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
                ).then(result => this.getOne({ id: result.id }));
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
    getWithChildren(props) {
        return this.get(props)
            .then(result => {
                return Promise.map(result, entry => {
                    return this._getAllChildren(entry.id)
                        .then(children => _.assign({}, entry, children));
                });
            });
    },

    getWithChildrenOne(props) {
        return this.getWithChildren(props)
            .then(this._getFirst.bind(this));
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
                    return this._getChildLeaves.apply(this, [...args, Child]);
                }

                return this._getChildTrees.apply(this, [...args, Child]);
            });
    },

    /**
     * @param {String} relationTable - Table name of parent to child relation. For example 'boards_lists'.
     * @param {String} parentIdName - Name of parent entity id column in relation table. For example 'board_id'.
     * @param {String} childIdName - Name of child entity id column in relation table. For example 'list_id'.
     * @param {Number} parentId - Id of parent entry.
     * @param {Object} Child - Child model object.
     * @returns {Promise} - Resolves array of related leaves child entries. For example, if parent is List, function will resolve all related cards.
     */
    _getChildLeaves(
        relationTable,
        parentIdName,
        childIdName,
        parentId,
        Child
    ) {
        return db.query(`
            SELECT a.* FROM $5~ AS a
            JOIN $1~ ON ($2~ = $4 and a.id = $3~)
        `, [relationTable, parentIdName, childIdName, parentId, Child.table])
            .then(this._filterEntries.bind(Child));
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
            .then(treesIds => Promise.map(treesIds, id => Child.getWithChildrenOne({ id })))
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
                    const err = this._getNotExistError();

                    return Promise.reject(err);
                }
            });
    },

    _filterEntries(entries) {
        return _.map(entries, entry => {
            const visible = {};
            _.forIn(entry, (value, key) => {
                if (this.visibleFields.indexOf(key) !== -1) {
                    visible[key] = value;
                }
            });
            return visible;
        });
    },

    _getFirst(entries) {
        const entry = entries[0];
        if (!entry) {
            const err = this._getNotExistError();
            throw err;
        }
        return entry;
    },

    _getNotExistError() {
        const err = new Error(`${this.table} entry does not exists`);
        err.code = 0;
        return err;
    }

};

function getTableFields(table) {
    return db.result('SELECT * FROM $1~', [table])
        .then(result => _.map(result.fields, field => field.name))
};

function isLeaf(Entity) {
    return !(Entity.children && Entity.children instanceof Array && Entity.children.length);
};

module.exports = Base;
