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

          assert.deepEqual(board, {
            id: boardId,
            title: 'test board 1',
            link: '/boards/' + boardId,
            lists: [],
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
            link: '/boards/' + boardId,
            starred: false,
            lists_length: 0,
            cards_length: 0,
          }, {
            id: board3Id,
            title: 'test board 3',
            link: '/boards/' + board3Id,
            starred: false,
            lists_length: 0,
            cards_length: 0,
          }]);

          done();
        });
    }).catch(done);
  });

  it('POST /api/boards should respond with 201 and return created board', (done) => {
    setup().then(request => {
      request
        .post('/api/boards')
        .send({
          title: 'test board',
        })
        .expect(201)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;
          const boardId = result.board.id;

          assert.property(result.activity, 'created_at');
          assert.property(result.board, 'id');
          delete result.activity.created_at;
          delete result.board.id;

          assert.deepEqual(result, {
            board: {
              title: 'test board',
              link: '/boards/' + boardId,
            },
            activity: {
              id: 1,
              type: 'board',
              action: 'Created',
              entry: {
                title: 'test board',
                link: '/boards/' + boardId,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'Board was successfully created',
            type: 'info',
          });

          db.one(`
            SELECT EXISTS(SELECT board_id FROM users_boards WHERE board_id = $1)`,
            [boardId]
          )
            .then(result => {
              assert.isTrue(result.exists);
              done();
            }, done);
        });
    });
  });

  it('POST /api/boards/:id/lists should respond with 201 and return created list', (done) => {
    setup().then(request => {
      request
        .post(`/api/boards/${boardId}/lists`)
        .send({
          title: 'test list',
        })
        .expect(201)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;
          const link = '/boards/' + boardId + '/lists/' + result.list.id;

          assert.property(result, 'activity');
          assert.property(result.list, 'id');
          delete result.activity.created_at;
          delete result.list.id;

          assert.deepEqual(result, {
            list: {
              link,
              title: 'test list',
            },
            activity: {
              id: 1,
              action: 'Created',
              type: 'list',
              entry: {
                title: 'test list',
                link,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'List was successfully created',
            type: 'info',
          });

          done();
        });
    }).catch(done);
  });

  it('PUT /api/boards/:id should respond with 200 and return updated entry', (done) => {
    setup().then(request => {
      request
        .put(`/api/boards/${boardId}?activityAction=Renamed`)
        .send({
          title: 'new title',
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;

          assert.property(result.activity, 'created_at');
          delete result.activity.created_at;

          assert.deepEqual(result, {
            board: {
              id: boardId,
              title: 'new title',
            },
            activity: {
              id: 1,
              action: 'Renamed',
              type: 'board',
              entry: {
                title: 'new title',
                link: '/boards/' + boardId,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'Board was successfully updated',
            type: 'info',
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

          const { result, notification } = res.body;

          assert.property(result.activity, 'created_at');
          assert.property(result.trash, 'deleted');
          delete result.activity.created_at;
          delete result.trash.deleted;

          assert.deepEqual(result, {
            board: {
              id: boardId,
            },
            trash: {
              entry_id: boardId,
              entry_table: 'boards',
              content: 'test board 1',
            },
            activity: {
              id: 1,
              type: 'board',
              action: 'Removed',
              entry: {
                title: 'test board 1',
                link: '/boards/' + boardId,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'Board was successfully removed',
            type: 'info',
          });

          done();
        });
    }).catch(done);
  });

  it('POST /api/boards/:id/toggleStarred should toggle `starred` value', (done) => {
    setup().then(request => {
      request
        .post(`/api/boards/${boardId}/toggleStarred`)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          assert.deepEqual(res.body.result, {
            id: boardId,
            starred: true,
          });

          done();
        });
    });
  });
});

function setup() {
  return authenticate().then(request => {
    return db.one(`SELECT id FROM users`)
      .then(result => {
        return db.none(
          `INSERT INTO boards (id, title)
          VALUES ($1, 'test board 1'), ($2, 'test board 2'), ($3, 'test board 3');
          INSERT INTO users_boards VALUES ($4, $1), ($4, $3);`,
          [boardId, board2Id, board3Id, result.id]
        );
      })
      .then(() => request);
  });
}
