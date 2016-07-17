import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import search from 'client/reducers/search';

describe('search reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(search(undefined, {}), {
      results: undefined,
      query: undefined,
      isFetching: false,
    });
  });

  it('should handle SEARCH_REQUEST action', () => {
    const prevState = {
      results: undefined,
      query: undefined,
      isFetching: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.SEARCH_REQUEST,
      payload: {
        query: 'test',
      },
    };
    assert.deepEqual(search(prevState, action), {
      results: undefined,
      query: 'test',
      isFetching: true,
    });
  });

  it('should handle SEARCH_SUCCESS action', () => {
    const prevState = {
      results: undefined,
      query: 'test',
      isFetching: true,
    };

    deepFreeze(prevState);

    const result = [{
      id: 1,
      content: 'test',
      type: 'Cards',
      link: '/boards/1/cards/1',
    }];
    const action = {
      type: types.SEARCH_SUCCESS,
      payload: {
        result,
      },
    };
    assert.deepEqual(search(prevState, action), {
      results: result,
      query: 'test',
      isFetching: false,
    });
  });

  it('should handle SEARCH_RESET action', () => {
    const prevState = {
      results: [{
        id: 1,
        content: 'test',
        type: 'Cards',
        link: '/boards/1/cards/1',
      }],
      query: 'test',
      isFetching: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.SEARCH_RESET,
    };
    assert.deepEqual(search(prevState, action), {
      results: undefined,
      query: undefined,
      isFetching: false,
    });
  });
});
