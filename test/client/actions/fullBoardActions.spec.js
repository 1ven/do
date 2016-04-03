import { assert } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from 'client/constants/actionTypes';
import * as actions from 'client/actions/fullBoardActions';
import { headers } from 'client/constants/config';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('boardsActions', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    describe('getFullBoard', () => {
        it('should handle FULL_BOARD_GET_SUCCESS when board is fetched successfully', () => {
            const fullBoard = 'full board data...';
            const expectedActions = [
                { type: types.FULL_BOARD_GET_SUCCESS, payload: fullBoard }
            ];
            const store = mockStore({ fullBoard: null });

            nock('http://localhost', { reqheaders:  headers })
                .post('/boards/get-full', { id: 5 })
                .reply(200, { success: true, data: fullBoard });

            return store.dispatch(actions.getFullBoard(5))
                .then(() => {
                    assert.deepEqual(store.getActions(), expectedActions);
                });
        });
    });
});
