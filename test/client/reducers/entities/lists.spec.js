import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import lists from 'client/reducers/entities/lists';

describe('lists reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(lists(undefined, {}), {});
  });

  it('should handle all actions with `payload.entities.lists` prop', () => {
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: 'TEST',
      payload: {
        entities: {
          lists: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
      },
    };
    assert.deepEqual(lists(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
      },
    });
  });

  it('should handle LIST_ADD_CARD_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        cards: ['3'],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.LIST_ADD_CARD_ID,
      payload: {
        listId: '1',
        cardId: '4',
      },
    };
    assert.deepEqual(lists(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        cards: ['3', '4'],
      },
    });
  });

  it('should handle LIST_REMOVE_CARD_ID action', () => {
    const prevState = {
      '1': {
        id: '1',
        title: 'test',
        cards: ['3', '4'],
      },
    };

    deepFreeze(prevState);

    const action = {
      type: types.LIST_REMOVE_CARD_ID,
      payload: {
        listId: '1',
        cardId: '4',
      },
    };
    assert.deepEqual(lists(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
        cards: ['3'],
      },
    });
  });
});
