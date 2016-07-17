import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { signIn, signUp, signOut } from 'client/actions/signActions';

describe('sign actions', () => {
  it('should create `signIn` actions', () => {
    assert.equal(signIn.request().type, types.SIGN_IN_REQUEST);
    assert.equal(signIn.success().type, types.SIGN_IN_SUCCESS);
    assert.equal(signIn.failure().type, types.SIGN_IN_FAILURE);
  });

  it('should create `signUp` actions', () => {
    assert.equal(signUp.request().type, types.SIGN_UP_REQUEST);
    assert.equal(signUp.success().type, types.SIGN_UP_SUCCESS);
    assert.equal(signUp.failure().type, types.SIGN_UP_FAILURE);
  });

  it('should create `signOut` actions', () => {
    assert.equal(signOut.request().type, types.SIGN_OUT_REQUEST);
    assert.equal(signOut.success().type, types.SIGN_OUT_SUCCESS);
    assert.equal(signOut.failure().type, types.SIGN_OUT_FAILURE);
  });
});
