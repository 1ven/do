import { assert } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from 'client/constants/actionTypes';
import * as actions from 'client/actions/boardsActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('boardsActions', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    describe('getBoards', () => {
        it('should create BOARDS_GET_SUCCESS action when getting boards has been done', () => {
            const boards = [
                { id: 1, title: 'board 1', lists: null },
                { id: 2, title: 'board 2', lists: null }
            ];
            const expectedActions = [
                { type: types.BOARDS_GET_REQUEST },
                { type: types.BOARDS_GET_SUCCESS, payload: boards }
            ];
            const store = mockStore({ boards: [] });

            nock('http://localhost').post('/boards/get-all')
                .reply(200, { success: true, data: boards });

            return store.dispatch(actions.getBoards())
                .then(() => {
                    assert.deepEqual(store.getActions(), expectedActions);
                });
        });

        it('should create BOARDS_GET_ERROR action when getting boards has been done with error', () => {
            const errorMessage = 'Test error message';
            const expectedActions = [
                { type: types.BOARDS_GET_REQUEST },
                { type: types.BOARDS_GET_ERROR, payload: new Error(errorMessage), error: true }
            ];
            const store = mockStore({ boards: [] });

            nock('http://localhost').post('/boards/get-all')
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
});
