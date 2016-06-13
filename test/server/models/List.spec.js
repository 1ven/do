import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import List from 'server/models/List';

const boardId = shortid.generate();
const listId = shortid.generate();

describe('List', () => {
  beforeEach(() => recreateTables().then(setup));

  describe('create', () => {
    const listData = {
      title: 'test list',
    };

    it('should create list', () => {
      return List.create(boardId, listData)
        .then(list => {
          assert.property(list, 'id');
          assert.deepEqual(_.omit(list, ['id']), {
            title: listData.title,
            link: '/boards/' + boardId + '/lists/' + list.id,
          });
        });
    });

    it('should relate list to board', () => {
      return List.create(boardId, listData)
        .then(list => {
          return db.one(
            'SELECT board_id FROM boards_lists WHERE list_id = $1',
            [list.id]
          );
        })
        .then(result => {
          assert.equal(result.board_id, boardId);
        });
    });

    it('should generate shortid', () => {
      return List.create(boardId, listData)
        .then(list => {
          assert.isTrue(shortid.isValid(list.id));
        });
    });
  });

  describe('update', () => {
    it('should update list and return updated list with id and updated fields', () => {
      return List.update(listId, { title: 'updated title' })
        .then(list => {
          assert.deepEqual(list, {
            id: listId,
            title: 'updated title',
          });
        });
    });
  });

  describe('drop', () => {
    it('should assign to deleted prop current timestamp', () => {
      return List.drop(listId)
        .then(() => {
          return db.one(
            `SELECT deleted FROM lists WHERE id = $1`,
            [listId]
          );
        })
        .then(list => {
          assert.isNumber(list.deleted);
        });
    });

    it('should return dropped list id', () => {
      return List.drop(listId)
        .then(result => {
          assert.deepEqual(result, {
            id: listId,
          });
        });
    });
  });
  
  describe('getParentsIds', () => {
    it('should return parents ids of list', () => {
      return List.getParentsIds(listId)
        .then(ids => {
          assert.deepEqual(ids, {
            board_id: boardId,
          });
        });
    });
  });
});

function setup() {
  return db.none(
    `INSERT INTO boards(id, title) VALUES ($1, 'test board');
    INSERT INTO lists(id, title) VALUES ($2, 'test list');
    INSERT INTO boards_lists VALUES ($1, $2)`,
    [boardId, listId]
  );
}
