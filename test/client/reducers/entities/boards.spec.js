import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import boards from 'client/reducers/entities/boards';

describe('boards entities reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(boards(undefined, {}), {});
  });

  it('should handle all actions with `payload.entities.boards` prop', () => {
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: 'TEST',
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
      },
    });
  });

  it('should handle BOARD_ADD_LIST_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        lists: [],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_ADD_LIST_ID,
      payload: {
        boardId: '1',
        listId: '4'
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        lists: ['4'],
      },
    });
  });

  it('should handle BOARDS_REMOVE_LIST_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        lists: ['4', '5'],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_REMOVE_LIST_ID,
      payload: {
        boardId: '1',
        listId: '4'
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        lists: ['5'],
      },
    });
  });

  it('should handle BOARD_INC_LISTS_LENGTH action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        listsLength: 3,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_INC_LISTS_LENGTH,
      payload: {
        boardId: '1',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        listsLength: 4,
      },
    });
  });

  it('should handle BOARD_DEC_LISTS_LENGTH action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        listsLength: 3,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_DEC_LISTS_LENGTH,
      payload: {
        boardId: '1',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        listsLength: 2,
      },
    });
  });

  it('should handle BOARD_INC_CARDS_LENGTH action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        cardsLength: 3,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_INC_CARDS_LENGTH,
      payload: {
        boardId: '1',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        cardsLength: 4,
      },
    });
  });

  it('should handle BOARD_DEC_CARDS_LENGTH action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        cardsLength: 6,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_DEC_CARDS_LENGTH,
      payload: {
        boardId: '1',
        count: 2,
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        cardsLength: 4,
      },
    });
  });

  it('should handle BOARD_CREATE_SUCCESS action', () => {
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_CREATE_SUCCESS,
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
        result: {
          board: '1',
        },
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        cardsLength: 0,
        listsLength: 0,
      },
    });
  });
});
