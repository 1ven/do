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
          text: 'test card',
        })
        .expect(201)
        .end((err, res) => {
          if (err) { return done(err); }

          const card = res.body.result;
          const link = '/boards/' + boardId + '/cards/' + card.id;

          assert.property(card, 'id');
          assert.property(card.activity, 'created_at');
          delete card.activity.created_at;
          assert.deepEqual(_.omit(card, ['id']), {
            link, 
            text: 'test card',
            board_id: boardId,
            activity: {
              id: 1,
              action: 'Created',
              type: 'card',
              entry: {
                title: 'test card',
                link,
              },
            },
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
          title: 'new title',
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const list = res.body.result;

          assert.property(list.activity, 'created_at');
          delete list.activity.created_at;
          assert.deepEqual(list, {
            id: listId,
            title: 'new title',
            activity: {
              id: 1,
              action: 'Updated',
              type: 'list',
              entry: {
                title: 'new title',
                link: '/boards/' + boardId + '/lists/' + listId,
              },
            },
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

          const { result } = res.body;

          assert.property(result.activity, 'created_at');
          delete result.activity.created_at;
          assert.deepEqual(result, {
            id: listId,
            activity: {
              id: 1,
              action: 'Removed',
              type: 'list',
              entry: {
                title: 'test list',
                link: '/boards/' + boardId + '/lists/' + listId,
              },
            },
          });

          done();
        });
    }).catch(done);
  });
});

function setup() {
  return db.none(
    `INSERT INTO boards (id, title) VALUES($1, 'test board');
    INSERT INTO lists (id, title) VALUES($2, 'test list');
    INSERT INTO boards_lists VALUES ($1, $2)`,
    [boardId, listId]
  )
    .then(authenticate);
}
