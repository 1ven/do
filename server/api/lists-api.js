'use strict';

const db = require('../db');
const _ = require('lodash');
const baseApi = require('../api/base-api');
const cardsApi = require('../api/cards-api');

const listsApi = _.assign({}, baseApi, {
    table: 'lists',
    getFull(id) {
        return this.getById(id)
        .then(list => {
            if (!list.cards) { return list; }
            return cardsApi.getSome(list.cards)
            .then(cards => _.assign({}, list, { cards }));
        });
    },
    addCard(listId, cardId) {
        return this.addIdToArray('cards', listId, cardId, cardsApi.getById.bind(cardsApi));
    },
    removeCard(listId, cardId) {
        return this.removeIdFromArray('cards', listId, cardId);
    }
});

module.exports = listsApi;
