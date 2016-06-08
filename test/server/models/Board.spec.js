import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables, getValidationMessages } from '../helpers';
import db from 'server/db';
import Board from 'server/models/Board';

const boardId = shortid.generate();
const board2Id = shortid.generate();
const userId = shortid.generate();
const listId = shortid.generate();
const cardId = shortid.generate();

describe('Board', () => {
  beforeEach(() => recreateTables().then(setup));

  describe('create', () => {
    const boardData = {
      title: 'test board'
    };

    it('should create board', () => {
      return Board.create(userId, boardData).then(board => {
        assert.property(board, 'id');
        assert.property(board.activity, 'created_at');
        delete board.activity.created_at;
        assert.deepEqual(_.omit(board, ['id']), {
          title: boardData.title,
          link: '/boards/' + board.id,
          activity: {
            id: 1,
            type: 'board',
            action: 'Created',
            entry: {
              title: boardData.title,
              link: '/boards/' + board.id,
            },
          },
        });
      });
    });

    it('should relate board to user', () => {
      return Board.create(userId, boardData)
        .then(board => {
          return db.one(
            `SELECT user_id FROM users_boards WHERE board_id = $1`,
            [board.id]
          );
        })
        .then(result => {
          assert.equal(result.user_id, userId);
        });
    });

    it('should generate shortid', () => {
      return Board.create(userId, boardData)
        .then(board => {
          assert.isTrue(shortid.isValid(board.id));
        });
    });
  });

  describe('update', () => {
    it('should update board and return updated board with id, activity and updated fields', () => {
      return Board.update(userId, boardId, { title: 'updated title' })
        .then(board => {
          assert.property(board.activity, 'created_at');
          delete board.activity.created_at;
          assert.deepEqual(board, {
            id: boardId,
            title: 'updated title',
            activity: {
              id: 1,
              action: 'Updated',
              type: 'board',
              entry: {
                title: 'updated title',
                link: '/boards/' + boardId,
              },
            },
          });
        });
    });
  });

  describe('drop', () => {
    it('should drop board entry', () => {
      return Board.drop(board2Id)
        .then(() => {
          return db.query(`SELECT id FROM boards WHERE id = '2'`);
        })
        .then(result => {
          assert.lengthOf(result, 0);
        });
    });

    it('should return dropped board id', () => {
      return Board.drop(board2Id)
        .then(result => {
          assert.equal(result.id, board2Id);
        });
    });
  });

  describe('find', () => {
    describe('findById', () => {
      it('should return board with nested children', () => {
        return Board.findById(boardId)
          .then(board => {
            assert.deepEqual(board, {
              id: boardId,
              title: 'test board',
              link: '/boards/' + boardId,
              lists: [{
                id: listId,
                title: 'test list',
                link: '/boards/' + boardId + '/lists/' + listId,
                cards: [{
                  id: cardId,
                  text: 'test card',
                  link: '/boards/' + boardId + '/cards/' + cardId,
                }],
              }],
            });
          });
      });
    });

    describe('findAllByUser', () => {
      it('should return all boards with nested children', () => {
        return Board.findAllByUser(userId)
          .then(boards => {
            assert.deepEqual(boards, [{
              id: boardId,
              title: 'test board',
              link: '/boards/' + boardId,
              lists_length: 1,
              cards_length: 1,
              starred: false,
            }]);
          });
      });
    });
  });

  describe('toggleStarred', () => {
    it('should toggle starred flag', () => {
      return Board.toggleStarred(userId, boardId)
        .then(board => {
          assert.deepEqual(board, {
            id: boardId,
            starred: true,
          });
        });
    });
  });

  describe('archive', () => {
    it('should set `archive` flag to true', () => {
      return Board.archive(boardId)
        .then(() => {
          return db.one(
            `SELECT archived FROM boards WHERE id = $1`,
            [boardId]
          );
        })
        .then(result => {
          assert.isTrue(result.archived);
        });
    });

    it('should return archived entry id', () => {
      return Board.archive(boardId)
        .then(result => {
          assert.deepEqual(result, {
            id: boardId,
          });
        });
    });
  });

  describe('validate', () => {
    it('should not be rejected if all props are valid', () => {
      return Board.validate({ title: 'test board' })
        .catch(err => {
          assert.deepEqual(err.validation, []);
        });
    });

    describe('title', () => {
      it('should be rejected if title is not provided', () => {
        return Board.validate({})
          .catch(getValidationMessages)
          .then(messages => {
            assert.include(messages, 'Title is required');
          });
      });
    });
  });
});

function setup() {
  return db.none(
    `INSERT INTO users(id, username, email, hash, salt)
    VALUES ($5, 'test', 'test@test.com', 'hash', 'salt');
    INSERT INTO boards(id, title) VALUES ($1, 'test board'), ($2, 'test board 2');
    INSERT INTO users_boards VALUES ($5, $1);
    INSERT INTO lists(id, title) VALUES ($3, 'test list');
    INSERT INTO boards_lists VALUES ($1, $3);
    INSERT INTO cards(id, text) VALUES ($4, 'test card');
    INSERT INTO lists_cards VALUES ($3, $4);`,
    [boardId, board2Id, listId, cardId, userId]
  );
}
