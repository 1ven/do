import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const listId = shortid.generate();
const commentId = shortid.generate();
const comment2Id = shortid.generate();
const cardId = shortid.generate();
const card2Id = shortid.generate();
const userId = shortid.generate();

describe('cards routes', () => {
  beforeEach(recreateTables);

  it('PUT /api/cards/:id should respond with 200 and return updated entry', (done) => {
    setup().then(request => {
      request
        .put(`/api/cards/${card2Id}`)
        .send({
          text: 'new text',
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;

          assert.property(result.activity, 'created_at');
          delete result.activity.created_at;

          assert.deepEqual(result, {
            card: {
              id: card2Id,
              text: 'new text',
            },
            activity: {
              id: 1,
              action: 'Updated',
              type: 'card',
              entry: {
                title: 'new text',
                link: '/boards/' + boardId + '/cards/' + card2Id,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'Card was successfully updated',
            type: 'info',
          });

          done();
        });
    }).catch(done);
  });

  it('DELETE /api/cards/:id should respond with 200 and return deleted entry id', (done) => {
    setup().then(request => {
      request
        .delete(`/api/cards/${card2Id}`)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;

          assert.property(result.activity, 'created_at');
          delete result.activity.created_at;

          assert.deepEqual(result, {
            card: {
              id: card2Id,
            },
            activity: {
              id: 1,
              action: 'Deleted',
              type: 'card',
              entry: {
                title: 'test card 2',
                link: '/boards/' + boardId + '/cards/' + card2Id,
              },
            },
          });

          assert.deepEqual(notification, {
            message: 'Card was successfully removed',
            type: 'info',
          });

          done();
        });
    }).catch(done);
  });

  it('GET /api/cards/:id should respond 200 and return card with all relations', (done) => {
    setup().then(request => {
      request
        .get(`/api/cards/${cardId}`)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const card = res.body.result;

          assert.notEqual(card.colors, 0);
          assert.property(card, 'colors');
          assert.property(card.comments[0], 'created_at');
          assert.property(card.comments[1], 'created_at');

          delete card.comments[0].created_at;
          delete card.comments[1].created_at;

          assert.deepEqual(_.omit(card, ['colors']), {
            id: cardId,
            text: 'test card 1',
            link: '/boards/' + boardId + '/cards/' + cardId,
            board_id: boardId,
            comments: [{
              id: commentId,
              text: 'test comment 1',
              user: {
                id: userId,
                username: 'testuser',
              },
            }, {
              id: comment2Id,
              text: 'test comment 2',
              user: {
                id: userId,
                username: 'testuser',
              },
            }],
          });

          done();
        });
    }).catch(done);
  });

  it('POST /api/cards/:id/comments should respond with 201', (done) => {
    setup().then(request => {
      request
        .post(`/api/cards/${cardId}/comments`)
        .send({
          text: 'test comment',
        })
        .expect(201)
        .end((err, res) => {
          if (err) { return done(err); }

          const comment = res.body.result;

          assert.property(comment, 'id');
          assert.property(comment, 'created_at');
          assert.deepEqual(_.omit(comment, ['id', 'created_at', 'user']), {
            text: 'test comment',
          });

          assert.property(comment.user, 'id');
          assert.deepEqual(_.omit(comment.user, ['id']), {
            username: 'test',
          });

          done();
        });
    }).catch(done);
  });

  it('POST /api/cards/:id/addColor should add color to card, respond with 200 and return colors array', (done) => {
    setup().then(request => {
      request
        .post(`/api/cards/${cardId}/addColor`)
        .send({
          color_id: 2,
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const card = res.body.result;

          assert.notEqual(card.colors.length, 0);
          assert.lengthOf(card.colors.filter(c => c.active === true), 1);
          assert.deepEqual(_.omit(card, ['colors']), {
            id: cardId,
          });

          done();
        });
    }).catch(done);
  });

  it('POST /api/cards/:id/removeColor should remove color to card, respond with 200 and return colors array', (done) => {
    setup().then(request => {
      request
        .post(`/api/cards/${card2Id}/removeColor`)
        .send({
          color_id: 3,
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const card = res.body.result;

          assert.notEqual(card.colors.length, 0);
          assert.lengthOf(card.colors.filter(c => c.active === true), 0);
          assert.deepEqual(_.omit(card, ['colors']), {
            id: card2Id,
          });

          done();
        });
    }).catch(done);
  });

  it('POST /api/cards/move should respond with 200 return updated lists and move cards', (done) => {
    setup().then(request => {
      request
        .post(`/api/cards/move`)
        .send({
          sourceList: {
            id: listId,
            cards: [card2Id, cardId],
          },
          targetList: {
            id: listId,
            cards: [card2Id, cardId],
          },
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          assert.deepEqual(res.body.result, [{
            id: listId,
            cards: [card2Id, cardId],
          }]);

          done();
        });
    }).catch(done);
  });
});

function setup() {
  return db.none(
    `INSERT INTO users (id, username, email, hash, salt)
    VALUES ($1, 'testuser', 'testuser@test.com', 'hash', 'salt');
    INSERT INTO boards (id, title) VALUES ($6, 'test board');
    INSERT INTO lists (id, title) VALUES ($7, 'test list');
    INSERT INTO boards_lists VALUES ($6, $7);
    INSERT INTO cards (id, text, colors)
    VALUES ($2, 'test card 1', array[]::integer[]), ($3, 'test card 2', array[3]);
    INSERT INTO lists_cards VALUES ($7, $2), ($7, $3);
    INSERT INTO comments (id, text) VALUES ($4, 'test comment 1'), ($5, 'test comment 2');
    INSERT INTO cards_comments VALUES ($2, $4), ($2, $5);
    INSERT INTO users_comments VALUES ($1, $4), ($1, $5);`,
    [userId, cardId, card2Id, commentId, comment2Id, boardId, listId]
  )
      .then(authenticate);
}
