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

    // it('/lists/remove should remove list itself and remove it id from board', (done) => {
    //     const boardId = 5;
    //     const listId = 3;

    //     Promise.all([createBoards(), createLists()])
    //     .then(() => boardsApi.addList(boardId, listId))
    //     .then(() => boardsApi.addList(boardId, 4))
    //     .then(() => boardsApi.addList(boardId, 8))
    //     .then(() => { 
    //         request(app)
    //         .post('/lists/remove')
    //         .send({ boardId, listId })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end((requestErr, res) => {
    //             if (requestErr) { done(requestErr); }

    //             assert.equal(res.body.success, true);

    //             boardsApi.getById(boardId)
    //             .then(board => {
    //                 assert.notInclude(board.lists, listId);
    //                 assert.include(board.lists, 4);
    //                 assert.include(board.lists, 8);
    //             })
    //             .then(() => {
    //                 const promise = listsApi.getById(listId);
    //                 return expect(promise).to.be.rejectedWith(/No data returned from the query/);

    //             })
    //             .then(done, done);
    //         });
    //     });
    // });
});
