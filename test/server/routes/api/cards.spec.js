import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const cardId = shortid.generate();

describe('cards routes', () => {
    beforeEach(recreateTables);

    it('PUT /api/cards/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/cards/${cardId}`)
                .send({
                    text: 'new text'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.deepEqual(card, {
                        id: cardId,
                        text: 'new text'
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/cards/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/cards/${cardId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const id = res.body.result.id;

                    assert.equal(id, cardId);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return db.none(`INSERT INTO cards (id, text) VALUES ($1, 'test card')`, [cardId])
        .then(authenticate);
};
