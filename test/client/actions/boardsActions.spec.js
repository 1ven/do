import { assert } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from 'client/constants/actionTypes';
import * as actions from 'client/actions/boardsActions';
import { headers } from 'client/constants/config';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('boardsActions', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    describe('getBoards', () => {
        it('should dispatch BOARDS_GET_SUCCESS action when getting boards has been done', () => {
            const boards = [
                { id: 1, title: 'board 1', lists: null },
                { id: 2, title: 'board 2', lists: null }
            ];
            const expectedActions = [
                { type: types.BOARDS_GET_REQUEST },
                { type: types.BOARDS_GET_SUCCESS, payload: boards }
            ];
            const store = mockStore({ boards: [] });

            nock('http://localhost', { reqheaders:  headers })
                .post('/boards/get-all')
                .reply(200, { success: true, data: boards });

            return store.dispatch(actions.getBoards())
                .then(() => {
                    assert.deepEqual(store.getActions(), expectedActions);
                });
        });

        it('should dispatch BOARDS_GET_ERROR action when getting boards has been done with error', () => {
            const errorMessage = 'Test error message';
            const expectedActions = [
                { type: types.BOARDS_GET_REQUEST },
                { type: types.BOARDS_GET_ERROR, payload: new Error(errorMessage), error: true }
            ];
            const store = mockStore({ boards: [] });

            nock('http://localhost', { reqheaders:  headers })
                .post('/boards/get-all')
                .reply(200, { success: false, error: errorMessage });

            return store.dispatch(actions.getBoards())
                .then(() => {
                    const actions = store.getActions();
                    const err = actions[1].payload;

                    assert.deepEqual(actions, expectedActions);
                    assert.equal(err.message, errorMessage);
                });
        });
    });

    describe('createBoard', () => {
        it('should dispatch BOARDS_CREATE_SUCCESS, when board created successfully', () => {
            const board = {
                id: 4,
                title: 'test board'
            };
            const expectedActions = [
                { type: types.BOARDS_CREATE_SUCCESS, payload: board }
            ];
            const store = mockStore({ boards: [] });

            nock('http://localhost', { reqheaders:  headers })
                .post('/boards/create', {
                    title: board.title
                })
                .reply(200, { success: true, data: board });

            return store.dispatch(actions.createBoard(board.title))
                .then(() => {
                    assert.deepEqual(store.getActions(), expectedActions);
                });
        });
    });
});
