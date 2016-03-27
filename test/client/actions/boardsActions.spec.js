import { assert } from 'chai';
import * as boardsActions from 'client/actions/boardsActions';
import { BOARDS } from 'client/constants/actionTypes';

describe('boards actions', () => {
    it('should create an action to create board', () => {
        const title = 'test title';
        const action = boardsActions.create(title);
        const expectedAction = {
            type: BOARDS.CREATE,
            payload: {
                title
            }
        };
        assert.deepEqual(action, expectedAction);
    });

    it('should create an action to remove board', () => {
        const id = 5;
        const action = boardsActions.remove(id);
        const expectedAction = {
            type: BOARDS.REMOVE,
            payload: {
                id
            }
        };
        assert.deepEqual(action, expectedAction);
    });
});
