import _ from 'lodash';
import sinon from 'sinon';
import identity from 'lodash/identity';
import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import { getAllPage } from 'client/selectors/boardsSelectors';
import { BOARDS_PER_PAGE } from 'client/constants/config';
import {
  fetchBoardsTask,
  fetchStarredBoardsTask,
  fetchBoardsOnScroll,
  fetchBoardTask,
  createBoardTask,
  removeBoardTask,
  updateBoardTask,
  updateBoardModalFormTask,
  toggleStarredTask,
  watchFetchBoards,
  watchFetchStarredBoards,
  watchFetchBoard,
  watchCreateBoard,
  watchRemoveBoard,
  watchUpdateBoard,
  watchUpdateBoardModalForm,
  watchScrollBottom,
  watchFetchAllAndStarred,
  watchToggleStarred,
} from 'client/sagas/boardsSaga';

describe('boardsSaga', () => {
  describe('fetchBoardsTask', () => {
    const requestAction = {
      type: types.BOARDS_FETCH_REQUEST,
      payload: {
        pageIndex: 1,
      },
    };

    it('should not fail', () => {
      const response = {
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
      };
      const gen = fetchBoardsTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.fetchBoards, requestAction.payload.pageIndex, BOARDS_PER_PAGE)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARDS_FETCH_SUCCESS,
          payload: {
            ...response,
            request: {
              pageIndex: 1,
            },
          },
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchBoardsTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.fetchBoards, requestAction.payload.pageIndex, BOARDS_PER_PAGE)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARDS_FETCH_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('fetchStarredBoardsTask', () => {
    it('should not fail', () => {
      const response = {
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
      };
      const gen = fetchStarredBoardsTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchStarredBoards)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARDS_FETCH_STARRED_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchStarredBoardsTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchStarredBoards)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARDS_FETCH_STARRED_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('fetchBoardsOnScroll', () => {
    it('should return undefined when `pathname !== "/"`', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            pathname: '/boards/1',
          },
        },
        pages: {
          main: {
            all: {
              ids: ['1', '2'],
              isFetching: false,
              pageIndex: 1,
              isLastPage: true,
            },
          },
        },
      };
      const gen = fetchBoardsOnScroll();

      assert.deepEqual(
        gen.next().value,
        select(identity)
      );

      assert.deepEqual(gen.next(state), {
        value: undefined,
        done: true,
      });
    });

    it('should dispatch BOARDS_SET_PAGE_INDEX action and return undefined when `isCached = true`', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            pathname: '/',
          },
        },
        pages: {
          main: {
            all: {
              ids: _.times(32),
              isFetching: false,
              pageIndex: 1,
              isLastPage: true,
            },
          },
        },
      };
      const gen = fetchBoardsOnScroll();

      assert.deepEqual(
        gen.next().value,
        select(identity)
      );

      assert.deepEqual(
        gen.next(state).value,
        put({
          type: types.BOARDS_SET_PAGE_INDEX,
          payload: {
            pageIndex: 2,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should dispatch BOARDS_FETCH_REQUEST when `!isFetching && !isLastPage`', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            pathname: '/',
          },
        },
        pages: {
          main: {
            all: {
              ids: _.times(16),
              isFetching: false,
              pageIndex: 1,
              isLastPage: false,
            },
          },
        },
      };
      const gen = fetchBoardsOnScroll();

      assert.deepEqual(
        gen.next().value,
        select(identity)
      );

      assert.deepEqual(
        gen.next(state).value,
        put({
          type: types.BOARDS_FETCH_REQUEST,
          payload: {
            pageIndex: 2,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('fetchBoardTask', () => {
    const requestAction = {
      type: types.BOARD_FETCH_REQUEST,
      payload: {
        id: '1',
      },
    };

    it('should not fail', () => {
      const response = {
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
      };
      const gen = fetchBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_START,
        })
      );

      assert.deepEqual(
        gen.next().value,
        call(api.fetchBoard, requestAction.payload.id)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARD_FETCH_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_STOP,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_START,
        })
      );

      assert.deepEqual(
        gen.next().value,
        call(api.fetchBoard, requestAction.payload.id)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_FETCH_FAILURE,
          error: error.message,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_STOP,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('createBoardTask', () => {
    const requestAction = {
      type: types.BOARD_FETCH_REQUEST,
      payload: {
        title: 'board',
        description: 'some desc',
        resolve: sinon.spy(),
        reject: sinon.spy(),
      },
    };

    it('should not fail', () => {
      const response = {
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
      };
      const { title, description } = requestAction.payload;
      const gen = createBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createBoard, title, description)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARD_CREATE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);

      assert.equal(requestAction.payload.resolve.callCount, 1);
    });

    it('should fail', () => {
      const { title, description } = requestAction.payload;
      const error = new Error('test');
      const gen = createBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createBoard, title, description)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_CREATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);

      assert.equal(requestAction.payload.reject.callCount, 1);
    });
  });

  describe('removeBoardTask', () => {
    const requestAction = {
      type: types.BOARD_REMOVE_REQUEST,
      payload: {
        id: '1',
      },
    };
    const removeBoardResponse = {
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
    };
    const fetchBoardsResponse = {
      entities: {
        boards: {
          '3': {
            id: '3',
            title: 'test 3',
          },
        },
      },
      result: {
        boards: ['3'],
        count: '1',
      },
    };

    it('should not fail and append board from prev page, when `isLastPage === false`', () => {
      const state = {
        pages: {
          main: {
            all: {
              ids: ['1', '2'],
              isLastPage: false,
            },
          },
        },
      };
      const gen = removeBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        select(getAllPage)
      );

      assert.deepEqual(
        gen.next(state.pages.main.all).value,
        call(api.removeBoard, requestAction.payload.id)
      );

      assert.deepEqual(
        gen.next(removeBoardResponse).value,
        call(api.fetchBoards, state.pages.main.all.ids.length, 1)
      );

      assert.deepEqual(
        gen.next(fetchBoardsResponse).value,
        put({
          type: types.BOARD_ADD,
          payload: {
            board: fetchBoardsResponse.result.boards[0],
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_REMOVE_SUCCESS,
          payload: removeBoardResponse,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should not fail and not append board from prev page, when `isLastPage === true`', () => {
      const state = {
        pages: {
          main: {
            all: {
              ids: ['1', '2'],
              isLastPage: true,
            },
          },
        },
      };
      const gen = removeBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        select(getAllPage)
      );

      assert.deepEqual(
        gen.next(state.pages.main.all).value,
        call(api.removeBoard, requestAction.payload.id)
      );

      assert.deepEqual(
        gen.next(removeBoardResponse).value,
        put({
          type: types.BOARD_REMOVE_SUCCESS,
          payload: removeBoardResponse,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = removeBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        select(getAllPage)
      );

      assert.deepEqual(
        gen.next({}).value,
        call(api.removeBoard, requestAction.payload.id)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_REMOVE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('updateBoardTask', () => {
    const requestAction = {
      type: types.BOARD_UPDATE_REQUEST,
      payload: {
        id: '1',
        props: {
          title: 'test',
        },
        params: {},
      },
    };

    it('should not fail', () => {
      const response = {
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
      };
      const { id, props, params } = requestAction.payload;
      const gen = updateBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, props, params)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARD_UPDATE_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { id, props, params } = requestAction.payload;
      const gen = updateBoardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, props, params)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_UPDATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('updateBoardModalFormTask', () => {
    const requestAction = {
      type: types.BOARD_UPDATE_REQUEST,
      payload: {
        id: '1',
        props: {
          title: 'test',
        },
        resolve: sinon.spy(),
        reject: sinon.spy(),
      },
    };

    it('should not fail', () => {
      const response = {
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
      };
      const { id, props, resolve } = requestAction.payload;
      const gen = updateBoardModalFormTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, props)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARD_UPDATE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);

      assert.equal(resolve.callCount, 1);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { id, props, reject } = requestAction.payload;
      const gen = updateBoardModalFormTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, props)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_UPDATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);

      assert.equal(reject.callCount, 1);
    });
  });

  describe('toggleStarredTask', () => {
    const requestAction = {
      type: types.BOARD_TOGGLE_STARRED_REQUEST,
      payload: {
        id: '1',
        starred: false,
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test 1',
              starred: false,
            },
          },
        },
        result: {
          board: '1',
        },
      };
      const { id, starred } = requestAction.payload;
      const gen = toggleStarredTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, { starred }, {
          notify: false,
          activity: false,
        })
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.BOARD_TOGGLE_STARRED_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { id, starred } = requestAction.payload;
      const gen = toggleStarredTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateBoard, id, { starred }, {
          notify: false,
          activity: false,
        })
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.BOARD_TOGGLE_STARRED_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every BOARDS_FETCH_REQUEST action', () => {
      assert.deepEqual(
        watchFetchBoards().next().value,
        takeEvery(types.BOARDS_FETCH_REQUEST, fetchBoardsTask).next().value
      );
    });

    it('should watch every BOARDS_FETCH_STARRED_REQUEST action', () => {
      assert.deepEqual(
        watchFetchStarredBoards().next().value,
        takeEvery(types.BOARDS_FETCH_STARRED_REQUEST, fetchStarredBoardsTask).next().value
      );
    });

    it('should watch every BOARDS_FETCH_REQUEST action', () => {
      assert.deepEqual(
        watchFetchBoard().next().value,
        takeEvery(types.BOARD_FETCH_REQUEST, fetchBoardTask).next().value
      );
    });

    it('should watch every BOARD_CREATE_REQUEST action', () => {
      assert.deepEqual(
        watchCreateBoard().next().value,
        takeEvery(types.BOARD_CREATE_REQUEST, createBoardTask).next().value
      );
    });

    it('should watch every BOARD_REMOVE_REQUEST action', () => {
      assert.deepEqual(
        watchRemoveBoard().next().value,
        takeEvery(types.BOARD_REMOVE_REQUEST, removeBoardTask).next().value
      );
    });

    it('should watch every BOARD_UPDATE_REQUEST action', () => {
      assert.deepEqual(
        watchUpdateBoard().next().value,
        takeEvery(types.BOARD_UPDATE_REQUEST, updateBoardTask).next().value
      );
    });

    it('should watch every BOARD_UPDATE_MODAL_FORM action', () => {
      assert.deepEqual(
        watchUpdateBoardModalForm().next().value,
        takeEvery(types.BOARD_UPDATE_MODAL_FORM, updateBoardModalFormTask).next().value
      );
    });

    it('should watch every SCROLL_BOTTOM action', () => {
      assert.deepEqual(
        watchScrollBottom().next().value,
        takeEvery(types.SCROLL_BOTTOM, fetchBoardsOnScroll).next().value
      );
    });

    it('should watch every BOARD_TOGGLE_STARRED_REQUEST action', () => {
      assert.deepEqual(
        watchToggleStarred().next().value,
        takeEvery(types.BOARD_TOGGLE_STARRED_REQUEST, toggleStarredTask).next().value
      );
    });

    it('should start progress bar on boards request and stop it on boards success response', () => {
      const gen = watchFetchAllAndStarred();

      assert.deepEqual(
        gen.next().value,
        take(types.BOARDS_FETCH_REQUEST)
      );

      assert.deepEqual(
        gen.next().value,
        take(types.BOARDS_FETCH_STARRED_REQUEST)
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_START,
        })
      );

      assert.deepEqual(
        gen.next().value,
        take([
          types.BOARDS_FETCH_SUCCESS,
          types.BOARDS_FETCH_FAILURE,
          types.BOARDS_FETCH_STARRED_SUCCESS,
          types.BOARDS_FETCH_STARRED_FAILURE,
        ])
      );

      assert.deepEqual(
        gen.next().value,
        take([
          types.BOARDS_FETCH_SUCCESS,
          types.BOARDS_FETCH_FAILURE,
          types.BOARDS_FETCH_STARRED_SUCCESS,
          types.BOARDS_FETCH_STARRED_FAILURE,
        ])
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_STOP,
        })
      );
    });
  });
});
