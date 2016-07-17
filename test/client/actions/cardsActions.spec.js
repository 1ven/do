import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import {
  createCard,
  removeCard,
  fetchCard,
  updateCard,
  addColor,
  removeColor,
  addCommentId,
  removeCommentId,
} from 'client/actions/cardsActions';

describe('cards actions', () => {
  it('should create `createCard` actions', () => {
    assert.equal(createCard.request().type, types.CARD_CREATE_REQUEST);
    assert.equal(createCard.success().type, types.CARD_CREATE_SUCCESS);
    assert.equal(createCard.failure().type, types.CARD_CREATE_FAILURE);
  });

  it('should create `removeCard` actions', () => {
    assert.equal(removeCard.request().type, types.CARD_REMOVE_REQUEST);
    assert.equal(removeCard.success().type, types.CARD_REMOVE_SUCCESS);
    assert.equal(removeCard.failure().type, types.CARD_REMOVE_FAILURE);
  });

  it('should create `updateCard` actions', () => {
    assert.equal(updateCard.request().type, types.CARD_UPDATE_REQUEST);
    assert.equal(updateCard.success().type, types.CARD_UPDATE_SUCCESS);
    assert.equal(updateCard.failure().type, types.CARD_UPDATE_FAILURE);
  });

  it('should create `fetchCard` actions', () => {
    assert.equal(fetchCard.request().type, types.CARD_FETCH_REQUEST);
    assert.equal(fetchCard.success().type, types.CARD_FETCH_SUCCESS);
    assert.equal(fetchCard.failure().type, types.CARD_FETCH_FAILURE);
  });

  it('should create `addColor` actions', () => {
    assert.equal(addColor.request().type, types.CARD_ADD_COLOR_REQUEST);
    assert.equal(addColor.success().type, types.CARD_ADD_COLOR_SUCCESS);
    assert.equal(addColor.failure().type, types.CARD_ADD_COLOR_FAILURE);
  });

  it('should create `removeColor` actions', () => {
    assert.equal(removeColor.request().type, types.CARD_REMOVE_COLOR_REQUEST);
    assert.equal(removeColor.success().type, types.CARD_REMOVE_COLOR_SUCCESS);
    assert.equal(removeColor.failure().type, types.CARD_REMOVE_COLOR_FAILURE);
  });

  it('should create CARD_ADD_COMMENT_ID action', () => {
    const cardId = 1;
    const commentId = 4;
    assert.deepEqual(addCommentId(cardId, commentId), {
      type: types.CARD_ADD_COMMENT_ID,
      payload: {
        cardId,
        commentId,
      },
    });
  });

  it('should create CARD_REMOVE_COMMENT_ID action', () => {
    const cardId = 1;
    const commentId = 4;
    assert.deepEqual(removeCommentId(cardId, commentId), {
      type: types.CARD_REMOVE_COMMENT_ID,
      payload: {
        cardId,
        commentId,
      },
    });
  });
});
