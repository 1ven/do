import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import boards, { card, cards, board } from 'client/reducers/pages/board';

describe('board page, card reducer', () => {
  it('should return initial state', () => {
    assert.deepEqual(card(undefined, {}), {
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle CARD_FETCH_REQUEST action', () => {
    const prevState = {
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_REQUEST,
    };
    assert.deepEqual(card(prevState, action), {
      isFetching: true,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle CARD_FETCH_SUCCESS action', () => {
    const prevState = {
      isFetching: true,
      lastUpdated: undefined,
      error: true,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_SUCCESS,
      payload: {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: '1',
        receivedAt: 1,
      },
    };
    assert.deepEqual(card(prevState, action), {
      isFetching: false,
      lastUpdated: 1,
      error: false,
    });
  });

  it('should handle CARD_FETCH_FAILURE action', () => {
    const prevState = {
      isFetching: true,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_FAILURE,
    };
    assert.deepEqual(card(prevState, action), {
      isFetching: false,
      lastUpdated: undefined,
      error: true,
    });
  });
});

describe('board page, cards reducer', () => {
  it('should handle the initial state', () => {
    assert.deepEqual(cards(undefined, {}), {});
  });

  it('should handle CARD_FETCH_REQUEST action', () => {
    const prevState = {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_REQUEST,
      payload: {
        cardId: '2',
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
      '2': {
        isFetching: true,
        lastUpdated: undefined,
        error: false,
      },
    });
  });

  it('should handle CARD_FETCH_SUCCESS action', () => {
    const prevState = {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
      '2': {
        isFetching: true,
        lastUpdated: undefined,
        error: true,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_SUCCESS,
      payload: {
        request: {
          cardId: '2',
        },
        receivedAt: 1,
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
      '2': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    });
  });

  it('should handle CARD_FETCH_FAILURE action', () => {
    const prevState = {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
      '2': {
        isFetching: true,
        lastUpdated: undefined,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_FAILURE,
      payload: {
        request: {
          cardId: '2',
        },
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
      '2': {
        isFetching: false,
        lastUpdated: undefined,
        error: true,
      },
    });
  });
});

describe('board page, board reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(board(undefined, {}), {
      cards: {},
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle BOARD_FETCH_REQUEST action', () => {
    const prevState = {
      cards: {},
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_REQUEST,
    };
    assert.deepEqual(board(prevState, action), {
      cards: {},
      isFetching: true,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle BOARD_FETCH_SUCCESS action', () => {
    const prevState = {
      cards: {},
      isFetching: true,
      lastUpdated: undefined,
      error: true,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_SUCCESS,
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
        result: '1',
        receivedAt: 1,
      },
    };
    assert.deepEqual(board(prevState, action), {
      cards: {},
      isFetching: false,
      lastUpdated: 1,
      error: false,
    });
  });

  it('should handle BOARD_FETCH_FAILURE action', () => {
    const prevState = {
      cards: {},
      isFetching: true,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_FAILURE,
    };
    assert.deepEqual(board(prevState, action), {
      cards: {},
      isFetching: false,
      lastUpdated: undefined,
      error: true,
    });
  });

  it('should handle CARD_FETCH_REQUEST action', () => {
    const prevState = {
      cards: {},
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_REQUEST,
      payload: {
        cardId: '1',
      },
    };
    assert.deepEqual(board(prevState, action), {
      cards: {
        '1': {
          isFetching: true,
          lastUpdated: undefined,
          error: false,
        },
      },
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle CARD_FETCH_SUCCESS action', () => {
    const prevState = {
      cards: {
        '1': {
          isFetching: true,
          lastUpdated: undefined,
          error: true,
        },
      },
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_SUCCESS,
      payload: {
        request: {
          cardId: '1',
        },
        receivedAt: 1,
      },
    };
    assert.deepEqual(board(prevState, action), {
      cards: {
        '1': {
          isFetching: false,
          lastUpdated: 1,
          error: false,
        },
      },
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    });
  });

  it('should handle CARD_FETCH_FAILURE action', () => {
    const prevState = {
      cards: {
        '1': {
          isFetching: true,
          lastUpdated: undefined,
          error: false,
        },
      },
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_FAILURE,
      payload: {
        request: {
          cardId: '1',
        },
      },
    };
    assert.deepEqual(board(prevState, action), {
      cards: {
        '1': {
          isFetching: false,
          lastUpdated: undefined,
          error: true,
        },
      },
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    });
  });
});

describe('board page, boards reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(boards(undefined, {}), {});
  });

  it('should handle BOARD_FETCH_REQUEST action', () => {
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_REQUEST,
      payload: {
        id: '1',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {},
        isFetching: true,
        lastUpdated: undefined,
        error: false,
      },
    });
  });

  it('should handle BOARD_FETCH_SUCCESS action', () => {
    const prevState = {
      '1': {
        cards: {},
        isFetching: true,
        lastUpdated: undefined,
        error: true,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_SUCCESS,
      payload: {
        result: '1',
        receivedAt: 1,
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {},
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    });
  });

  it('should handle BOARD_FETCH_FAILURE action', () => {
    const prevState = {
      '1': {
        cards: {},
        isFetching: true,
        lastUpdated: undefined,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_FETCH_FAILURE,
      payload: {
        result: '1',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {},
        isFetching: false,
        lastUpdated: undefined,
        error: true,
      },
    });
  });

  it('should handle CARD_FETCH_REQUEST action', () => {
    const prevState = {
      '1': {
        cards: {},
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_REQUEST,
      payload: {
        boardId: '1',
        cardId: '2',
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {
          '2': {
            isFetching: true,
            lastUpdated: undefined,
            error: false,
          },
        },
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    });
  });

  it('should handle CARD_FETCH_SUCCESS action', () => {
    const prevState = {
      '1': {
        cards: {
          '2': {
            isFetching: true,
            lastUpdated: undefined,
            error: true,
          },
        },
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_SUCCESS,
      payload: {
        request: {
          boardId: '1',
          cardId: '2',
        },
        result: '2',
        receivedAt: 1,
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {
          '2': {
            isFetching: false,
            lastUpdated: 1,
            error: false,
          },
        },
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    });
  });

  it('should handle CARD_FETCH_FAILURE action', () => {
    const prevState = {
      '1': {
        cards: {
          '2': {
            isFetching: true,
            lastUpdated: undefined,
            error: false,
          },
        },
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_FETCH_FAILURE,
      payload: {
        request: {
          boardId: '1',
          cardId: '2',
        },
        result: '2',
        receivedAt: 1,
      },
    };
    assert.deepEqual(boards(prevState, action), {
      '1': {
        cards: {
          '2': {
            isFetching: false,
            lastUpdated: undefined,
            error: true,
          },
        },
        isFetching: false,
        lastUpdated: 1,
        error: false,
      },
    });
  });
});
