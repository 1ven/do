import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import { entity } from 'client/reducers/entities';

describe('entity helper function', () => {
  it('should return reducer which should return the initial state', () => {
    assert.deepEqual(entity('boards')(undefined, {}), {});
  });

  it('should return reducer which should handle all actions having `payload.entities`', () => {
    const reducer = entity('boards');
    const prevState = {};

    deepFreeze(prevState);

    const action = {
      type: 'TEST',
      payload: {
        entities: {
          boards: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
      },
    };
    assert.deepEqual(reducer(prevState, action), {
      '1': {
        id: '1',
        title: 'test',
      },
    });
  });
});
