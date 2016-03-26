'use strict'

const listsApi = require('../api/lists-api');
const cardsApi = require('../api/cards-api');

module.exports = (post) => {
    post('/cards/create', body => {
        return cardsApi.create({ text: body.text })
        .then(result => {
            const cardId = result.id;
            return listsApi.addCard(body.listId, cardId)
            .then(() => { return { cardId }; });
        });
    });
    post('/cards/remove', body => {
        return cardsApi.remove(body.cardId)
        .then(() => listsApi.removeCard(body.listId, body.cardId));
    });
};
