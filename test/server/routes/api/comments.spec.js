import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const commentId = shortid.generate();
const comment2Id = shortid.generate();
const cardId = shortid.generate();
const userId = shortid.generate();

describe('comments routes', () => {
  beforeEach(recreateTables);

  it('DELETE /api/comments/:id should respond with 200 and return deleted entry id', (done) => {
    setup().then(request => {
      request
        .delete(`/api/comments/${commentId}`)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }

          const { result, notification } = res.body;

          assert.deepEqual(result, {
            id: commentId,
          });

          assert.deepEqual(notification, {
            message: 'Comment was successfully removed',
            type: 'info',
          });

          done();
        });
    }).catch(done);
  });
});

function setup() {
  return db.none(
    `INSERT INTO users (id, username, email, hash, salt)
    VALUES ($1, 'testuser', 'testuser@test.com', 'hash', 'salt');
    INSERT INTO cards (id, text) VALUES ($2, 'test card 1');
    INSERT INTO comments (id, text) VALUES ($3, 'test comment 1'), ($4, 'test comment 2');
    INSERT INTO cards_comments VALUES ($2, $3), ($2, $4);
    INSERT INTO users_comments VALUES ($1, $3), ($1, $4);`,
    [userId, cardId, commentId, comment2Id]
  )
      .then(authenticate);
}
