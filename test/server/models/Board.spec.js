import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables, getValidationMessages } from '../helpers';
import db from 'server/db';
import Board from 'server/models/Board';

chai.use(chaiAsPromised);

const boardId = shortid.generate();
const board2Id = shortid.generate();
const board3Id = shortid.generate();
const userId = shortid.generate();
const listId = shortid.generate();
const list2Id = shortid.generate();
const cardId = shortid.generate();
const card2Id = shortid.generate();

describe('Board', () => {
  beforeEach(() => recreateTables().then(setup));

  describe('create', () => {
    const boardData = {
      title: 'test board'
    };

    it('should create board', () => {
      return Board.create(userId, boardData).then(board => {
        assert.property(board, 'id');
        assert.deepEqual(_.omit(board, ['id']), {
          title: boardData.title,
          link: '/boards/' + board.id,
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
    it('should update board and return updated board with id and updated fields', () => {
      return Board.update(boardId, { title: 'updated title' })
        .then(board => {
          assert.deepEqual(board, {
            id: boardId,
            title: 'updated title',
          });
        });
    });
  });

  describe('drop', () => {
    it('should assign to deleted prop current timestamp', () => {
      return Board.drop(board2Id)
        .then(() => {
          return db.one(
            `SELECT deleted FROM boards WHERE id = $1`,
            [board2Id]
          );
        })
        .then(board => {
          assert.isNumber(board.deleted);
        });
    });

    it('should return dropped board id', () => {
      return Board.drop(board2Id)
        .then(result => {
          assert.deepEqual(result, {
            id: board2Id,
          });
        });
    });
  });

  describe('findById', () => {
    it('should return board with nested children', () => {
      return Board.findById(boardId)
        .then(board => {
          const { colors } = board.lists[0].cards[0];

          assert.notEqual(colors.length, 0);
          delete board.lists[0].cards[0].colors;
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

    it('should not return deleted boards', () => {
      const promise = Board.findById(board3Id);
      return assert.isRejected(promise, /No data returned/);
    });
  });

  describe('findAllByUser', () => {
    it('should return all boards, related to user, with nested children, excluding deleted items', () => {
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

  describe('findAllIdsByUser', () => {
    it('should return all boards ids, related to user, excluding deleted items', () => {
      return Board.findAllIdsByUser(userId)
        .then(boards => {
          assert.deepEqual(boards, [boardId]);
        });
    });
  });

  describe('toggleStarred', () => {
    it('should toggle starred flag', () => {
      return Board.toggleStarred(boardId)
        .then(board => {
          assert.deepEqual(board, {
            id: boardId,
            starred: true,
          });
        });
    });
  });

  describe('move', () => {
    beforeEach(() => recreateTables().then(() => db.none(
      `INSERT INTO users(id, username, email, hash, salt)
      VALUES ($1, 'test', 'test@test.com', 'hash', 'salt');
      INSERT INTO boards (id, title) VALUES
        ('1', 'board 1'),
        ('2', 'board 2'),
        ('3', 'board 3'),
        ('4', 'board 4'),
        ('5', 'board 5');
      INSERT INTO users_boards VALUES
        ($1, '1'), ($1, '2'), ($1, '3'), ($1, '4'), ($1, '5')`,
      [userId]
    )));

    const findBoards = () => db.query(
      `SELECT id, title FROM boards AS b
      INNER JOIN users_boards AS ub ON (user_id = $1 AND ub.board_id = b.id)
      GROUP BY b.id, ub.board_index
      ORDER BY ub.board_index`,
      [userId]
    );

    it('should change boards order when target index is lower than source index', () => {
      return Board.move('4', '2')
        .then(findBoards)
        .then(boards => {
          assert.deepEqual(boards, [{
            id: '1',
            title: 'board 1',
          }, {
            id: '4',
            title: 'board 4',
          }, {
            id: '2',
            title: 'board 2',
          }, {
            id: '3',
            title: 'board 3',
          }, {
            id: '5',
            title: 'board 5',
          }]);
        });
    });

    it('should change boards order when target index is higher that source index', () => {
      return Board.move('2', '4')
        .then(findBoards)
        .then(boards => {
          assert.deepEqual(boards, [{
            id: '1',
            title: 'board 1',
          }, {
            id: '3',
            title: 'board 3',
          }, {
            id: '4',
            title: 'board 4',
          }, {
            id: '2',
            title: 'board 2',
          }, {
            id: '5',
            title: 'board 5',
          }]);
        });
    });
  });
});

function setup() {
  return db.none(
    `INSERT INTO users(id, username, email, hash, salt)
    VALUES ($5, 'test', 'test@test.com', 'hash', 'salt');
    INSERT INTO boards(id, title, deleted)
    VALUES ($1, 'test board', null), ($2, 'test board 2', null), ($6, 'test board 3', 1);
    INSERT INTO users_boards VALUES ($5, $1), ($5, $6);
    INSERT INTO lists(id, title, deleted)
    VALUES ($3, 'test list', null), ($7, 'test list 2', 1);
    INSERT INTO boards_lists VALUES ($1, $3), ($1, $7);
    INSERT INTO cards(id, text, deleted)
    VALUES ($4, 'test card', null), ($8, 'test card', 1);
    INSERT INTO lists_cards VALUES ($3, $4), ($3, $8);`,
    [boardId, board2Id, listId, cardId, userId, board3Id, list2Id, card2Id]
  );
}
