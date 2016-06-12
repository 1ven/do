import { CALL_API } from '../middlewares/api';
import { CARD, ACTIVITY, TRASH } from '../schemas';
import * as types from '../constants/actionTypes';

export function createCard(listId, text) {
  return {
    [CALL_API]: {
      types: [
        types.CARDS_CREATE_REQUEST,
        types.CARDS_CREATE_SUCCESS,
        types.CARDS_CREATE_ERROR,
      ],
      endpoint: `/api/lists/${listId}/cards`,
      schema: {
        card: CARD,
        activity: ACTIVITY,
      },
      request: {
        method: 'post',
        body: {
          text,
        },
      },
    },
  };
};

export function removeCard(id) {
  return {
    [CALL_API]: {
      types: [
        types.CARDS_REMOVE_REQUEST,
        types.CARDS_REMOVE_SUCCESS,
        types.CARDS_REMOVE_ERROR,
      ],
      endpoint: `/api/cards/${id}`,
      schema: {
        card: CARD,
        activity: ACTIVITY,
        trashItem: TRASH,
      },
      request: {
        method: 'delete',
      },
    },
  };
};

export function updateCard(id, props) {
  return {
    [CALL_API]: {
      types: [
        types.CARDS_UPDATE_REQUEST,
        types.CARDS_UPDATE_SUCCESS,
        types.CARDS_UPDATE_ERROR,
      ],
      endpoint: `/api/cards/${id}`,
      schema: {
        card: CARD,
        activity: ACTIVITY,
      },
      request: {
        method: 'put',
        body: props,
      },
    },
  };
};

export function getCard(id) {
  return {
    [CALL_API]: {
      types: [
        types.CARD_GET_REQUEST,
        types.CARD_GET_SUCCESS,
        types.CARD_GET_ERROR,
      ],
      endpoint: `/api/cards/${id}`,
      schema: CARD,
      request: {
        method: 'get',
      },
    },
  };
};

export function addCommentId(cardId, commentId) {
  return {
    type: types.CARDS_ADD_COMMENT_ID,
    payload: {
      cardId,
      commentId,
    },
  };
};
