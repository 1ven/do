import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import { allBoards, starredBoards } from 'client/reducers/pages/main';

describe('allBoards reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(allBoards(undefined, {}), {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_REQUEST action', () => {
    const prevState = {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_REQUEST,
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: true,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_SUCCESS action', () => {
    const prevState = {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: true,
      lastUpdated: undefined,
      error: true,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_SUCCESS,
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test 1',
            },
            '2': {
              id: '2',
              title: 'test 2',
            },
          },
        },
        result: {
          boards: ['1', '2'],
          count: '2',
        },
        request: {
          pageIndex: 1,
        },
        receivedAt: 1,
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 2,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_FAILURE action', () => {
    const prevState = {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: true,
      lastUpdated: undefined,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_FAILURE,
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: [],
      pageIndex: undefined,
      count: 0,
      isLastPage: false,
      isFetching: false,
      lastUpdated: undefined,
      error: true,
    });
  });

  it('should handle BOARD_CREATE_SUCCESS action and not remove last board id if `isLastPage = true`', () => {
    const prevState = {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 2,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_CREATE_SUCCESS,
      payload: {
        entities: {
          boards: {
            '3': {
              id: '3',
              title: 'test 3',
            },
          },
        },
        result: {
          board: '3',
        },
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['3', '1', '2'],
      pageIndex: 1,
      count: 3,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARD_CREATE_SUCCESS action and remove last board id if `isLastPage = false`', () => {
    const prevState = {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 2,
      isLastPage: false,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_CREATE_SUCCESS,
      payload: {
        entities: {
          boards: {
            '3': {
              id: '3',
              title: 'test 3',
            },
          },
        },
        result: {
          board: '3',
        },
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['3', '1'],
      pageIndex: 1,
      count: 3,
      isLastPage: false,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARD_REMOVE_SUCCESS action', () => {
    const prevState = {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 2,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_REMOVE_SUCCESS,
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test 1',
            },
          },
        },
        result: {
          board: '1',
        },
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['2'],
      pageIndex: 1,
      count: 1,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARD_ADD action', () => {
    const prevState = {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 10,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_ADD,
      payload: {
        board: {
          id: '3',
          title: 'test',
        },
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['1', '2', '3'],
      pageIndex: 1,
      count: 10,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARDS_SET_PAGE_INDEX action', () => {
    const prevState = {
      ids: ['1', '2'],
      pageIndex: 1,
      count: 10,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_SET_PAGE_INDEX,
      payload: {
        pageIndex: 2,
      },
    };
    assert.deepEqual(allBoards(prevState, action), {
      ids: ['1', '2'],
      pageIndex: 2,
      count: 10,
      isLastPage: true,
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });
});

describe('starredBoards reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(starredBoards(undefined, {}), {
      ids: [],
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_STARRED_REQUEST action', () => {
    const prevState = {
      ids: [],
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_STARRED_REQUEST,
    };
    assert.deepEqual(starredBoards(prevState, action), {
      ids: [],
      isFetching: true,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_STARRED_SUCCESS', () => {
    const prevState = {
      ids: [],
      isFetching: true,
      lastUpdated: undefined,
      error: true,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_STARRED_SUCCESS,
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test 1',
            },
            '2': {
              id: '2',
              title: 'test 2',
            },
          },
        },
        result: {
          boards: ['1', '2'],
        },
        receivedAt: 1,
      },
    };
    assert.deepEqual(starredBoards(prevState, action), {
      ids: ['1', '2'],
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARDS_FETCH_STARRED_FAILURE action', () => {
    const prevState = {
      ids: [],
      isFetching: true,
      lastUpdated: undefined,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARDS_FETCH_STARRED_FAILURE,
    };
    assert.deepEqual(starredBoards(prevState, action), {
      ids: [],
      isFetching: false,
      lastUpdated: undefined,
      error: true,
    });
  });

  it('should handle BOARD_TOGGLE_STARRED_SUCCESS action and add id if `board.starred = true`', () => {
    const prevState = {
      ids: ['1', '2'],
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_TOGGLE_STARRED_SUCCESS,
      payload: {
        entities: {
          boards: {
            '3': {
              id: '3',
              title: 'test 3',
              starred: true,
            },
          },
        },
        result: {
          board: '3',
        },
      },
    };
    assert.deepEqual(starredBoards(prevState, action), {
      ids: ['1', '2', '3'],
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });

  it('should handle BOARD_TOGGLE_STARRED_SUCCESS action and remove id if `board.starred = false`', () => {
    const prevState = {
      ids: ['1', '2'],
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    };

    deepFreeze(prevState);

    const action = {
      type: types.BOARD_TOGGLE_STARRED_SUCCESS,
      payload: {
        entities: {
          boards: {
            '2': {
              id: '2',
              title: 'test 2',
              starred: false,
            },
          },
        },
        result: {
          board: '2',
        },
      },
    };
    assert.deepEqual(starredBoards(prevState, action), {
      ids: ['1'],
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
    });
  });
});
