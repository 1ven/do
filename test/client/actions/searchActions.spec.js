import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { search, resetSearch } from 'client/actions/searchActions';

describe('search actions', () => {
  it('should create `search` actions', () => {
    assert.equal(search.request().type, types.SEARCH_REQUEST);
    assert.equal(search.success().type, types.SEARCH_SUCCESS);
    assert.equal(search.failure().type, types.SEARCH_FAILURE);
  });

  it('should create SEARCH_RESET action', () => {
    assert.deepEqual(resetSearch(), {
      type: types.SEARCH_RESET,
    });
  });
});
