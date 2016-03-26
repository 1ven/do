'use strict'

const listsApi = require('../api/lists-api');
const cardsApi = require('../api/cards-api');

module.exports = (post) => {
    post('/cards/create', body => {
        const text = body.text;
        const listId = body.listId;

        return cardsApi.create({ text })
        .then(result => {
            const cardId = result.id;

            return listsApi.addCard(listId, cardId)
            .then(() => ({ cardId }));
        });
    }, ['text', 'listId']);

    post('/cards/remove', body => {
        const listId = body.listId;
        const cardId = body.cardId;

        return cardsApi.remove(cardId)
        .then(() => listsApi.removeCard(listId, cardId));
    }, ['listId', 'cardId']);
};
