import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import db from 'server/db';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const listId = shortid.generate();

describe('lists routes', () => {
    beforeEach(recreateTables);

    it('POST /api/lists/:id/cards should respond with 201 and return created card', (done) => {
        setup().then(request => {
            request
                .post(`/api/lists/${listId}/cards`)
                .send({
                    text: 'test card'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.property(card, 'id');

                    assert.deepEqual(_.omit(card, ['id']), {
                        text: 'test card',
                        link: '/boards/' + boardId + '/cards/' + card.id
                    });

                    done();
                });
        }).catch(done);
    });

    it('PUT /api/lists/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/lists/${listId}`)
                .send({
                    title: 'new title'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const list = res.body.result;

                    assert.property(list, 'link');
                    assert.deepEqual(_.omit(list, ['link']), {
                        id: listId,
                        title: 'new title'
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/lists/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/lists/${listId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const id = res.body.result.id;

                    assert.equal(id, listId);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return db.none(`
        INSERT INTO boards (id, title) VALUES($1, 'test board');
        INSERT INTO lists (id, title) VALUES($2, 'test list');
        INSERT INTO boards_lists VALUES ($1, $2);
    `, [boardId, listId])
        .then(authenticate);
};
