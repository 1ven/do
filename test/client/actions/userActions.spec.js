import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { fetchUser } from 'client/actions/userActions';

describe('user actions', () => {
  it('should create `fetchUser` actions', () => {
    assert.equal(fetchUser.request().type, types.USER_FETCH_REQUEST);
    assert.equal(fetchUser.success().type, types.USER_FETCH_SUCCESS);
    assert.equal(fetchUser.failure().type, types.USER_FETCH_FAILURE);
  });
});
