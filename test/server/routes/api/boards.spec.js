import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import Board from 'server/models/board';
import { authenticate } from '../../helpers';

const boardsData = [{
    id: shortid.generate(),
    title: 'test board 1'
}, {
    id: shortid.generate(),
    title: 'test board 2'
}];

describe('boards routes', () => {
    it('GET /api/boards/:id should respond with 200 and return board', (done) => {
        setup().then(request => {
            request
                .get(`/api/boards/${boardsData[1].id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const board = res.body.result;

                    assert.property(board, 'id');
                    delete board.id;
                    assert.deepEqual(board, {
                        title: boardsData[1].title,
                        lists: []
                    });

                    done();
                });
        }).catch(done);
    });

    it('GET /api/boards should respond with 200 and return all boards', (done) => {
        setup().then(request => {
            request
                .get('/api/boards')
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const boards = res.body.result;
                    const expected = boardsData.map(board => _.assign({}, board, { lists: [] }));
                    assert.deepEqual(boards, expected);

                    done();
                });
        }).catch(done);
    });

    it('POST /api/boards should respond with 201 and return created board', (done) => {
        setup().then(request => {
            request
                .post('/api/boards')
                .send({
                    title: 'test board'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const board = res.body.result;
                    assert.property(board, 'id');
                    delete board.id;
                    assert.deepEqual(board, {
                        title: 'test board',
                        lists: []
                    });

                    done();
                });
        });
    });

    it('POST /api/boards/:id/lists should respond with 201 and return created list', (done) => {
        setup().then(request => {
            request
                .post(`/api/boards/${boardsData[1].id}/lists`)
                .send({
                    title: 'test list'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const list = res.body.result;

                    assert.property(list, 'id');
                    delete list.id;
                    assert.deepEqual(list, {
                        title: 'test list',
                        cards: []
                    });

                    done();
                });
        }).catch(done);
    });

    it('PUT /api/boards/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/boards/${boardsData[1].id}`)
                .send({
                    title: 'new title'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const board = res.body.result;

                    assert.property(board, 'id');
                    delete board.id;
                    assert.deepEqual(board, {
                        title: 'new title',
                        lists: []
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/boards/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/boards/${boardsData[1].id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const boardId = res.body.result.id;

                    assert.equal(boardId, boardsData[1].id);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return authenticate()
        .then(request => {
            return Board.bulkCreate(boardsData)
                .then(() => request);
        });
};
