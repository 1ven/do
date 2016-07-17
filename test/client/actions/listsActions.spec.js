import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import {
  createList,
  removeList,
  updateList,
  addCardId,
  removeCardId,
} from 'client/actions/listsActions';

describe('lists actions', () => {
  it('should create `createList` actions', () => {
    assert.equal(createList.request().type, types.LIST_CREATE_REQUEST);
    assert.equal(createList.success().type, types.LIST_CREATE_SUCCESS);
    assert.equal(createList.failure().type, types.LIST_CREATE_FAILURE);
  });

  it('should create `removeList` actions', () => {
    assert.equal(removeList.request().type, types.LIST_REMOVE_REQUEST);
    assert.equal(removeList.success().type, types.LIST_REMOVE_SUCCESS);
    assert.equal(removeList.failure().type, types.LIST_REMOVE_FAILURE);
  });

  it('should create `updateList` actions', () => {
    assert.equal(updateList.request().type, types.LIST_UPDATE_REQUEST);
    assert.equal(updateList.success().type, types.LIST_UPDATE_SUCCESS);
    assert.equal(updateList.failure().type, types.LIST_UPDATE_FAILURE);
  });

  it('should create LIST_ADD_CARD_ID action', () => {
    const listId = 1;
    const cardId = 4;
    assert.deepEqual(addCardId(listId, cardId), {
      type: types.LIST_ADD_CARD_ID,
      payload: {
        listId,
        cardId,
      },
    });
  });

  it('should create LIST_REMOVE_CARD_ID action', () => {
    const listId = 1;
    const cardId = 4;
    assert.deepEqual(removeCardId(listId, cardId), {
      type: types.LIST_REMOVE_CARD_ID,
      payload: {
        listId,
        cardId,
      },
    });
  });
});
