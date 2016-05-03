const _ = require('lodash');
const Promise = require('bluebird');
const db = require('../db');

module.exports = {
    hierarchy: ['users', 'boards', 'lists', 'cards'],

    check(data) {
        const entities = _.keys(data);
        const higherEntity = this._getHigherEntity(entities);
        const lowerEntity = _.without(entities, higherEntity)[0];
        const sql = this._getSql(higherEntity, lowerEntity, _.values(data));
        return db.result(sql)
            .then(result => result.rowCount >= 1);
    },

    _getSql(higherEntity, lowerEntity, values) {
        const joinSql = this._getJoinSql(higherEntity, lowerEntity);
        const idsNames = this._getIdsNames([higherEntity, lowerEntity]);
        const higherEntityChild = this._getChildEntity(higherEntity);
        const table = `${higherEntity}_${higherEntityChild}`;
        return `SELECT * FROM ${table} AS p ${joinSql}` +
            `WHERE ${idsNames[0]} = ${values[0]} AND ${idsNames[1]} = ${values[1]}`;
    },

    _getJoinSql(higherEntity, lowerEntity) {
        const innerEntities = this._getInnerEntities(higherEntity, lowerEntity);
        const idsNames = this._getIdsNames(innerEntities);
        return _.reduce(innerEntities, (acc, entity, i) => {
            const nextEntity = innerEntities[i + 1] || lowerEntity;
            const t0 = i === 0 ? 'p' : `t${i}`;
            const t = `t${i + 1}`;
            const idName = idsNames[i];
            return acc + `JOIN ${entity}_${nextEntity} AS ${t} ON (${t0}.${idName} = ${t}.${idName})`;
        }, '');
    },

    _getIdsNames(entities) {
        return entities.map(entity => {
            return entity.slice(0, -1) + '_id';
        });
    },

    _getHigherEntity(entities) {
        if (entities.filter(e => typeof e !== 'string').length) {
            throw new Error('All entities must be a strings');
        }

        const i0 = this._getIndexInHierarchy(entities[0]);
        const i1 = this._getIndexInHierarchy(entities[1]);

        return i0 < i1 ? entities[0] : entities[1];
    },

    _getInnerEntities(higherEntity, lowerEntity) {
        const highInd = this._getIndexInHierarchy(higherEntity);
        const lowInd = this._getIndexInHierarchy(lowerEntity);

        return this.hierarchy.filter((entity, i) => {
            return i > highInd && i < lowInd;
        });
    },

    _getChildEntity(entity) {
        const index = this._getIndexInHierarchy(entity);
        const child = this.hierarchy[index + 1];
        return child || null;
    },

    _getIndexInHierarchy(entity) {
        return this.hierarchy.indexOf(entity);
    }
};
