import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import db from 'server/db';
import sql from 'server/utils/sql';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const board2Id = shortid.generate();
const now = Math.round(Date.now() / 1000);

describe('trash routes', () => {
  beforeEach(() => {
    return recreateTables()
      .then(() => db.none(sql('views.sql')));
  });

  it('GET /api/trash/:pageIndex should respond with 200 and return items from trash by given page index', (done) => {
    setup().then(request => {
      request
        .get('/api/trash/1')
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          assert.deepEqual(res.body.result, {
            trash: [{
              entry_id: boardId,
              entry_table: 'boards',
              content: 'test board 1',
              deleted: now,
            }],
            pages_length: 1,
          });

          done();
        });
    });
  });

  it('POST /api/trash/restore/:entry_id should respond with 200 and return restored entry with corresponding activity', (done) => {
    setup().then(request => {
      request
        .post(`/api/trash/restore/${boardId}`)
        .send({
          table: 'boards',
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result } = res.body;

          assert.isNumber(result.activity.created_at);
          delete result.activity.created_at;
          assert.deepEqual(_.omit(result, ['created_at']), {
            board: {
              id: boardId,
              title: 'test board 1',
              link: `/boards/${boardId}`,
            },
            activity: {
              id: 1,
              type: 'board',
              action: 'Restored',
              entry: {
                title: 'test board 1',
                link: `/boards/${boardId}`,
              },
            },
          });

          done();
        });
    });
  });
});

function setup() {
  return authenticate().then(request => {
    return db.one(`SELECT id FROM users`)
      .then(({ id }) => {
        return db.none(
          `INSERT INTO boards(id, title, deleted)
          VALUES ($2, 'test board 1', $4), ($3, 'test board 2', null);
          INSERT INTO users_boards VALUES ($1, $2), ($1, $3)`,
          [id, boardId, board2Id, now]
        );
      })
      .then(() => request);
  });
}
