import { assert } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from 'client/constants/actionTypes';
import * as boardsActions from 'client/actions/boardsActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('boardsActions', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    describe('getBoards', () => {
        it('should create BOARDS_GET_SUCCESS action when getting boards has been done', () => {
            nock('/boards/get-all')
                .post(
        });
    });
});
