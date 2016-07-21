import { assert } from 'chai';
import {
  getStarredIds,
  getStarredError,
  getStarredVisibility,
  getAllIds,
  getAllPageIndex,
  getAllCount,
  getAllSpinner,
  getAllError,
  getBoardEntity,
  getAllVisibility,
  getAllPage,
  getStarredGroup,
  getAllGroup,
  makeGetBoard,
  getGroups,
} from 'client/selectors/boardsSelectors';

describe('boardsSelectors', () => {
  const state = {
    entities: {
      boards: {
        '1': {
          id: '1',
          title: 'test',
        },
      },
    },
    pages: {
      main: {
        all: {
          ids: ['1', '2'],
          pageIndex: 1,
          count: 3,
          isLastPage: false,
          isFetching: false,
          lastUpdated: 1,
          error: false,
        },
        starred: {
          ids: ['1'],
          isLastPage: false,
          isFetching: false,
          lastUpdated: 1,
          error: false,
        },
      },
    },
  };

  it('should return starred boards ids', () => {
    assert.deepEqual(getStarredIds(state), ['1']);
  });

  it('should return starred boards error state', () => {
    assert.deepEqual(getStarredError(state), false);
  });

  it('should return all boards ids', () => {
    assert.deepEqual(getAllIds(state), ['1', '2']);
  });

  it('should return all boards page index', () => {
    assert.deepEqual(getAllPageIndex(state), 1);
  });

  it('should return all boards count', () => {
    assert.deepEqual(getAllCount(state), 3);
  });

  it('should return all boards spinner state', () => {
    assert.deepEqual(getAllSpinner(state), false);
  });

  it('should return all boards error state', () => {
    assert.deepEqual(getAllError(state), false);
  });

  it('should return board entity', () => {
    assert.deepEqual(getBoardEntity(state, { id: '1' }), {
      id: '1',
      title: 'test',
    });
  });

  it('should return all page data object', () => {
    assert.deepEqual(getAllPage(state), {
      ids: ['1', '2'],
      error: false,
      lastUpdated: 1,
      isFetching: false,
      isLastPage: false,
      pageIndex: 1,
      count: 3,
    });
  });

  it('should return starred group data object', () => {
    assert.deepEqual(getStarredGroup(state), {
      title: 'Starred boards',
      type: 'starred',
      ids: ['1'],
      hidden: false,
      error: false,
    });
  });

  it('should return all group data object', () => {
    assert.deepEqual(getAllGroup(state), {
      title: 'My boards',
      type: 'all',
      ids: ['1', '2'],
      count: 3,
      spinner: false,
      hidden: false,
      error: false,
    });
  });
});
