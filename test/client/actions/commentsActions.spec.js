import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { createComment, removeComment } from 'client/actions/commentsActions';

describe('comments actions', () => {
  it('should create `createComment` actions', () => {
    assert.equal(createComment.request().type, types.COMMENT_CREATE_REQUEST);
    assert.equal(createComment.success().type, types.COMMENT_CREATE_SUCCESS);
    assert.equal(createComment.failure().type, types.COMMENT_CREATE_FAILURE);
  });

  it('should create `removeComment` actions', () => {
    assert.equal(removeComment.request().type, types.COMMENT_REMOVE_REQUEST);
    assert.equal(removeComment.success().type, types.COMMENT_REMOVE_SUCCESS);
    assert.equal(removeComment.failure().type, types.COMMENT_REMOVE_FAILURE);
  });
});
