import Promise from 'bluebird';
import db from 'server/db';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
import cardsApi from 'server/api/cards-api';
import app from 'server/.';
import { recreateTables } from '../helpers';

chai.use(chaiAsPromised);

describe('cards routes', () => {
    beforeEach(recreateTables);

    it('/cards/create should create card and place it id on list', (done) => {
        const listId = 2;
        const cardText = 'test card';

        db.none(`INSERT INTO lists (title) values ('list 1'), ('list 2');`)
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

                    db.one('SELECT * FROM cards WHERE id = $1', [cardId])
                        .then(card => assert.equal(card.text, cardText))
                        .then(() => db.one('SELECT * FROM lists WHERE id = $1', [listId]))
                        .then(list => {
                            assert.include(list.cards, cardId);
                        })
                        .then(done, done);
                });
            });
    });

    it('/cards/remove should remove card itself and remove it id from list', (done) => {
        const listId = 2;
        const cardId = 3;

        db.none(`
            INSERT INTO lists (title, cards) values ('test list 1', ARRAY[1]), ('test list 2', ARRAY[2, 3]);
            INSERT INTO cards (text) values ('test card 1'), ('test card 2'), ('test card 3');
        `)
            .then(() => { 
                request(app)
                .post('/cards/remove')
                .send({ listId, cardId })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { done(err); }

                    assert.equal(res.body.success, true);

                    db.one('SELECT * FROM lists WHERE id = $1', [listId])
                        .then(list => {
                            assert.deepEqual(list.cards, [2]);
                        })
                        .then(() => {
                            const promise = db.one('SELECT * FROM cards WHERE id = $1', [cardId]);
                            return expect(promise).to.be.rejectedWith(/No data returned from the query/);
                        })
                        .then(done, done);
                });
            });
    });
});
