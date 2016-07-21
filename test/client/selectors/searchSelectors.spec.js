import { assert } from 'chai';
import { getStateResults, getResults } from 'client/selectors/searchSelectors';

describe('searchSelectors', () => {
  const state = {
    search: {
      results: [{
        id: 1,
        content: 'test',
        type: 'Cards',
        link: '/boards/1/cards/1',
      }],
    },
  };

  it('should return search results', () => {
    assert.deepEqual(getStateResults(state), [{
      id: 1,
      content: 'test',
      type: 'Cards',
      link: '/boards/1/cards/1',
    }]);
  });

  it('should return pretty results', () => {
    assert.deepEqual(getResults(state), [{
      type: 'Cards',
      items: [{
        title: 'test',
        link: '/boards/1/cards/1',
      }],
    }]);
  });
});
