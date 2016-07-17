import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { fetchActivity } from 'client/actions/activityActions';

describe('activity actions', () => {
  it('should create `fetchActivity` actions', () => {
    assert.equal(fetchActivity.request().type, types.ACTIVITY_FETCH_REQUEST);
    assert.equal(fetchActivity.success().type, types.ACTIVITY_FETCH_SUCCESS);
    assert.equal(fetchActivity.failure().type, types.ACTIVITY_FETCH_FAILURE);
  });
});
