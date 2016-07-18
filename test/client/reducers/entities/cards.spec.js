import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import cards from 'client/reducers/entities/cards';

describe('cards reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(cards(undefined, {}), {});
  });

  it('should handle all actions with `payload.entities.cards` prop', () => {
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: 'TEST',
      payload: {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        id: '1',
        text: 'test',
      },
    });
  });

  it('should handle CARD_ADD_COMMENT_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        text: 'test',
        comments: ['3'],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_ADD_COMMENT_ID,
      payload: {
        cardId: '1',
        commentId: '4',
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        id: '1',
        text: 'test',
        comments: ['3', '4'],
      },
    });
  });

  it('should handle CARD_REMOVE_COMMENT_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        text: 'test',
        comments: ['3', '4'],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.CARD_REMOVE_COMMENT_ID,
      payload: {
        cardId: '1',
        commentId: '4',
      },
    };
    assert.deepEqual(cards(prevState, action), {
      '1': {
        id: '1',
        text: 'test',
        comments: ['3'],
      },
    });
  });
});
