import { assert } from 'chai';
import Promise from 'bluebird';
import _ from 'lodash';
import { recreateTables } from '../helpers';
import db from 'server/db';
import sql from 'server/utils/sql';
import shortid from 'shortid';
import Trash from 'server/models/Trash';

const userId = shortid.generate();
const user2Id = shortid.generate();
const user3Id = shortid.generate();

describe('Trash', () => {
  beforeEach(() => (
    recreateTables()
      .then(() => db.none(sql('views.sql')))
      .then(setup)
  ));

  describe('find', () => {
    it('should return deleted entries for particular user according provided `pageIndex`', () => {
      return Trash.find(userId, 1)
        .then(result => {
          assert.lengthOf(result.entries, 20);
          assert.equal(result.pages_length, 9);
        });
    });

    it('should return 12 entries on last page', () => {
      return Trash.find(userId, 9)
        .then(result => {
          assert.lengthOf(result.entries, 12);
        });
    });

    it('should return empty entries array when nonexistent page index is provided', () => {
      return Trash.find(userId, 30)
        .then(result => {
          assert.deepEqual(result, {
            pages_length: 9,
            entries: [],
          });
        });
    });

    it('should return empty entries array if user has no deleted entries', () => {
      const emptyUserId = shortid.generate();
      const boardId = shortid.generate();
      return db.none(
        `INSERT INTO users(id, username, email, hash, salt)
        VALUES ($1, 'emptyuser', 'emptyuser@test.com', 'hash', 'salt');
        INSERT INTO boards (id, title) VALUES ($2, 'some board');
        INSERT INTO users_boards VALUES ($1, $2)`,
        [emptyUserId, boardId]
      )
        .then(() => {
          return Trash.find(user3Id, 1)
            .then(result => {
              assert.deepEqual(result, {
                pages_length: 0,
                entries: [],
              });
            });
        });
    });
  });

  describe('restore', () => {
    it('should restore entry and resolve it', () => {
      return db.one(`SELECT id FROM boards LIMIT 1`)
        .then(({ id }) => {
          return Trash.restore(userId, id, 'board')
            .then(board => {
              assert.isNumber(board.activity.created_at);
              delete board.activity.created_at;
              assert.deepEqual(board, {
                id: id,
                title: 'test board',
                link: '/boards/' + id,
                activity: {
                  id: 1,
                  type: 'board',
                  action: 'Restored',
                  entry: {
                    title: 'test board',
                    link: '/boards/' + id,
                  },
                },
              });
            });
        });
    });
  });
});

/* const len = 180; */
/* const entries = _.times(len, i => { */
/*   const third = len / 3; */
/*   const type = i < third ? 'board' : i >= third && i < third * 2 ? 'list' : 'card'; */
/*   const now = Math.round(Date.now() / 1000); */
/*   return { */
/*     entry_id: shortid.generate(), */
/*     content: `test ${type}`, */
/*     deleted: i % 4 === 0 ? null : now, */
/*     type, */
/*   }; */
/* }); */

/* const data = entries.reduce((acc, entry) => { */
/*   const { type } = entry; */
/*   return { */
/*     ...acc, */
/*     [type]: [ */
/*       ...acc[type] || [], */
/*       { */
/*         id: entry.entry_id, */
/*         [type === 'card' ? 'text' : 'title']: entry.content, */
/*         deleted: entry.deleted, */
/*       }, */
/*     ], */
/*   }; */
/* }, {}); */

/* console.log(data); */

// need to share all entries equal by two users;
function setup() {
  const now = Math.round(Date.now() / 1000);
  return db.tx(t => {
    return t.none(
      `INSERT INTO users(id, username, email, hash, salt) VALUES
        ($1, 'testuser1', 'testuser1@test.com', 'hash', 'salt'),
        ($2, 'testuser2', 'testuser2@test.com', 'hash', 'salt')`,
      [userId, user2Id]
    )
      .then(() => {
        return Promise.each(_.range(16), i => {
          const deleted = i % 2 === 0 ? null : now;
          const boardId = shortid.generate();
          return t.none(
            `INSERT INTO boards(id, title, deleted) VALUES ($1, $2, $3)`,
            [boardId, 'test board', deleted]
          )
            .then(() => {
              const _userId = i % 4 === 1 || i % 4 === 2 ? userId : user2Id;
              return t.none(
                `INSERT INTO users_boards VALUES ($1, $2)`,
                [_userId, boardId]
              );
            })
            .then(() => {
              return Promise.each(_.range(6), i => {
                const listId = shortid.generate();
                const deleted = i % 2 === 0 ? null : now;
                return t.none(
                  `INSERT INTO lists(id, title, deleted) VALUES ($1, $2, $3)`,
                  [listId, 'test list', deleted]
                )
                  .then(() => {
                    return t.none(
                      `INSERT INTO boards_lists VALUES ($1, $2)`,
                      [boardId, listId]
                    );
                  })
                  .then(() => {
                    return Promise.each(_.range(6), i => {
                      const cardId = shortid.generate();
                      const deleted = i % 2 === 0 ? null : now;
                      return t.none(
                        `INSERT INTO cards(id, text, deleted) VALUES ($1, $2, $3)`,
                        [cardId, 'test card', deleted]
                      )
                        .then(() => {
                          return t.none(
                            `INSERT INTO lists_cards VALUES ($1, $2)`,
                            [listId, cardId]
                          );
                        });
                    });
                  });
              });
            });
        });
      })
  });
}
