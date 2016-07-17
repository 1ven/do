import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import {
  fetchBoards,
  fetchStarredBoards,
  fetchBoard,
  createBoard,
  removeBoard,
  updateBoard,
  toggleStarred,
  addBoard,
  updateBoardModalForm,
  addListId,
  removeListId,
  incListsLength,
  decListsLength,
  incCardsLength,
  decCardsLength,
  setPageIndex,
} from 'client/actions/boardsActions';

describe('boards actions', () => {
  it('should create `fetchBoards` actions', () => {
    assert.equal(fetchBoards.request().type, types.BOARDS_FETCH_REQUEST);
    assert.equal(fetchBoards.success().type, types.BOARDS_FETCH_SUCCESS);
    assert.equal(fetchBoards.failure().type, types.BOARDS_FETCH_FAILURE);
  });

  it('should create `fetchStarredBoards` actions', () => {
    assert.equal(fetchStarredBoards.request().type, types.BOARDS_FETCH_STARRED_REQUEST);
    assert.equal(fetchStarredBoards.success().type, types.BOARDS_FETCH_STARRED_SUCCESS);
    assert.equal(fetchStarredBoards.failure().type, types.BOARDS_FETCH_STARRED_FAILURE);
  });

  it('should create `fetchBoard` actions', () => {
    assert.equal(fetchBoard.request().type, types.BOARD_FETCH_REQUEST);
    assert.equal(fetchBoard.success().type, types.BOARD_FETCH_SUCCESS);
    assert.equal(fetchBoard.failure().type, types.BOARD_FETCH_FAILURE);
  });

  it('should create `createBoard` actions', () => {
    assert.equal(createBoard.request().type, types.BOARD_CREATE_REQUEST);
    assert.equal(createBoard.success().type, types.BOARD_CREATE_SUCCESS);
    assert.equal(createBoard.failure().type, types.BOARD_CREATE_FAILURE);
  });

  it('should remove `removeBoard` actions', () => {
    assert.equal(removeBoard.request().type, types.BOARD_REMOVE_REQUEST);
    assert.equal(removeBoard.success().type, types.BOARD_REMOVE_SUCCESS);
    assert.equal(removeBoard.failure().type, types.BOARD_REMOVE_FAILURE);
  });

  it('should update `updateBoard` actions', () => {
    assert.equal(updateBoard.request().type, types.BOARD_UPDATE_REQUEST);
    assert.equal(updateBoard.success().type, types.BOARD_UPDATE_SUCCESS);
    assert.equal(updateBoard.failure().type, types.BOARD_UPDATE_FAILURE);
  });

  it('should update `toggleStarred` actions', () => {
    assert.equal(toggleStarred.request().type, types.BOARD_TOGGLE_STARRED_REQUEST);
    assert.equal(toggleStarred.success().type, types.BOARD_TOGGLE_STARRED_SUCCESS);
    assert.equal(toggleStarred.failure().type, types.BOARD_TOGGLE_STARRED_FAILURE);
  });

  it('should create BOARD_ADD action', () => {
    const board = {
      id: 1,
      title: 'test',
    };
    assert.deepEqual(addBoard(board), {
      type: types.BOARD_ADD,
      payload: {
        board,
      },
    });
  });

  it('should create BOARD_UPDATE_MODAL_FORM action', () => {
    const id = 1;
    const props = {
      title: 'test',
    };
    const resolve = Promise.resolve();
    const reject = Promise.reject();
    assert.deepEqual(updateBoardModalForm(id, props, resolve, reject), {
      type: types.BOARD_UPDATE_MODAL_FORM,
      payload: {
        id,
        props,
        resolve,
        reject
      },
    });
  });

  it('should create BOARD_ADD_LIST_ID action', () => {
    const boardId = 1;
    const listId = 2;
    assert.deepEqual(addListId(boardId, listId), {
      type: types.BOARD_ADD_LIST_ID,
      payload: {
        boardId,
        listId,
      },
    });
  });

  it('should create BOARD_REMOVE_LIST_ID action', () => {
    const boardId = 1;
    const listId = 2;
    assert.deepEqual(removeListId(boardId, listId), {
      type: types.BOARD_REMOVE_LIST_ID,
      payload: {
        boardId,
        listId,
      },
    });
  });

  it('should create BOARD_INC_LISTS_LENGTH action', () => {
    const boardId = 1;
    assert.deepEqual(incListsLength(boardId), {
      type: types.BOARD_INC_LISTS_LENGTH,
      payload: {
        boardId,
      },
    });
  });

  it('should create BOARD_DEC_LISTS_LENGTH action', () => {
    const boardId = 1;
    assert.deepEqual(decListsLength(boardId), {
      type: types.BOARD_DEC_LISTS_LENGTH,
      payload: {
        boardId,
      },
    });
  });

  it('should create BOARD_INC_CARDS_LENGTH action', () => {
    const boardId = 1;
    assert.deepEqual(incCardsLength(boardId), {
      type: types.BOARD_INC_CARDS_LENGTH,
      payload: {
        boardId,
      },
    });
  });

  it('should create BOARD_DEC_CARDS_LENGTH action', () => {
    const boardId = 1;
    const count = 5;
    assert.deepEqual(decCardsLength(boardId, count), {
      type: types.BOARD_DEC_CARDS_LENGTH,
      payload: {
        boardId,
        count,
      },
    });
  });

  it('should create BOARD_DEC_CARDS_LENGTH action with `count` prop equals `1` by default', () => {
    const boardId = 1;
    assert.deepEqual(decCardsLength(boardId), {
      type: types.BOARD_DEC_CARDS_LENGTH,
      payload: {
        boardId,
        count: 1,
      },
    });
  });

  it('should create BOARDS_SET_PAGE_INDEX action', () => {
    const pageIndex = 1;
    assert.deepEqual(setPageIndex(pageIndex), {
      type: types.BOARDS_SET_PAGE_INDEX,
      payload: {
        pageIndex,
      },
    });
  });
});
