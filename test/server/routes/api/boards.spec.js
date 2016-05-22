import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import db from 'server/db';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const board2Id = shortid.generate();
const board3Id = shortid.generate();

describe('boards routes', () => {
    beforeEach(recreateTables);

    it('GET /api/boards/:id should respond with 200 and return board', (done) => {
        setup().then(request => {
            request
                .get(`/api/boards/${boardId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const board = res.body.result;

                    assert.property(board, 'id');

                    assert.deepEqual(_.omit(board, ['id']), {
                        title: 'test board 1',
                        lists: []
                    });

                    done();
                });
        }).catch(done);
    });

    it('GET /api/boards should respond with 200 and return all boards related to user', (done) => {
        setup().then(request => {
            request
                .get('/api/boards')
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const boards = res.body.result;
                    assert.deepEqual(boards, [{
                        id: boardId,
                        title: 'test board 1',
                        lists: []
                    }, {
                        id: board3Id,
                        title: 'test board 3',
                        lists: []
                    }]);

                    done();
                });
        }).catch(done);
    });

    /* it('POST /api/boards should respond with 201 and return created board', (done) => { */
    /*     setup().then(request => { */
    /*         request */
    /*             .post('/api/boards') */
    /*             .send({ */
    /*                 title: 'test board' */
    /*             }) */
    /*             .expect(201) */
    /*             .end((err, res) => { */
    /*                 if (err) { return done(err); } */

    /*                 const board = res.body.result; */

    /*                 assert.property(board, 'id'); */

    /*                 assert.deepEqual(_.omit(board, ['id']), { */
    /*                     title: 'test board' */
    /*                 }); */

    /*                 done(); */
    /*             }); */
    /*     }); */
    /* }); */

    it('POST /api/boards/:id/lists should respond with 201 and return created list', (done) => {
        setup().then(request => {
            request
                .post(`/api/boards/${boardId}/lists`)
                .send({
                    title: 'test list'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const list = res.body.result;

                    assert.property(list, 'id');

                    assert.deepEqual(_.omit(list, ['id']), {
                        title: 'test list'
                    });

                    done();
                });
        }).catch(done);
    });

    it('PUT /api/boards/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/boards/${boardId}`)
                .send({
                    title: 'new title'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const board = res.body.result;

                    assert.property(board, 'id');

                    assert.deepEqual(_.omit(board, ['id']), {
                        title: 'new title'
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/boards/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/boards/${boardId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const id = res.body.result.id;

                    assert.equal(id, boardId);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return authenticate().then(request => {
        return db.one(`SELECT id FROM users`)
            .then(result => {
                return db.none(`
                    INSERT INTO boards (id, title)
                    VALUES ($1, 'test board 1'), ($2, 'test board 2'), ($3, 'test board 3');
                    INSERT INTO users_boards VALUES ($4, $1), ($4, $3);
                `, [boardId, board2Id, board3Id, result.id])
            })
            .then(() => request);
    });
};
