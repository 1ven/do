'use strict';

const db = require('../db');
const _ = require('lodash');
const baseApi = require('../api/base-api');
const cardsApi = require('../api/cards-api');

const listsApi = _.assign({}, baseApi, {
    table: 'lists',
    addCard(listId, cardId) {
        return cardsApi.getById(listId)
        .catch(() => { throw new Error('card does not exist'); })
        .then(() => db.none('UPDATE lists SET cards = array_append(cards, $2) WHERE id = $1', [listId, cardId]));
    },
    removeCard(listId, cardId) {
        return this.getById(listId)
        .then(list => {
            const updatedCards = _.without(list.cards, cardId);
            return db.none('UPDATE lists SET cards = $2 WHERE id = $1', [listId, updatedCards]);
        });
    }
});

module.exports = listsApi;
