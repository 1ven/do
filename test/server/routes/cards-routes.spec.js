import Promise from 'bluebird';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import app from 'server/.';
import { createLists, createCards, recreateTables } from '../helpers';

chai.use(chaiAsPromised);

describe('cards routes', () => {
    beforeEach(recreateTables);

    it('/cards/create should create card and place it id on list', (done) => {
        const listId = 6;
        const cardText = 'test card';

        createLists()
        .then(() => {
            request(app)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({
                text: cardText,
                listId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); }

                assert.equal(res.body.success, true);

                const cardId = res.body.data.cardId;

                cardsApi.getById(cardId)
                .then(card => assert.equal(card.text, cardText))
                .then(() => listsApi.getById(listId))
                .then(list => {
                    assert.include(list.cards, cardId);
                })
                .then(done, done);
            });
        });
    });

    it('/cards/remove should remove card itself and remove it id from list', (done) => {
        const listId = 7;
        const cardId = 4;

        Promise.all([createLists(), createCards()])
        .then(() => listsApi.addCard(listId, cardId))
        .then(() => listsApi.addCard(listId, 6))
        .then(() => listsApi.addCard(listId, 9))
        .then(() => { 
            request(app)
            .post('/cards/remove')
            .send({ listId, cardId })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); }

                assert.equal(res.body.success, true);

                listsApi.getById(listId)
                .then(list => {
                    assert.notInclude(list.cards, listId);
                    assert.include(list.cards, 6);
                    assert.include(list.cards, 9);
                })
                .then(() => {
                    const promise = cardsApi.getById(cardId);
                    return expect(promise).to.be.rejectedWith(/No data returned from the query/);

                })
                .then(done, done);
            });
        });
    });
});
