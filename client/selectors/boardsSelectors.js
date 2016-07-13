import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import cookie from 'js-cookie';
import identity from 'lodash/identity';
import isEqual from 'lodash/isEqual';
import { BOARDS_PER_PAGE } from '../constants/config';

const getStarredIds = (state) => state.pages.main.starred.ids;
const getStarredError = (state) => state.pages.main.starred.error;
const getAllIds = (state) => state.pages.main.all.ids;
const getAllPageIndex = (state) => state.pages.main.all.pageIndex;
const getAllCount = (state) => state.pages.main.all.count;
const getAllSpinner = (state) => state.pages.main.all.isFetching && !!state.pages.main.all.lastUpdated;
const getAllError = (state) => state.pages.main.all.error;

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const getStarredGroup = createSelector(
  [ getStarredIds, getStarredError ],
  (ids, error) => {
    return {
      hidden: !!cookie.get('starred_accordion_hidden'),
      title: 'Starred boards',
      type: 'starred',
      ids,
      error,
    };
  }
);

const getAllGroup = createSelector(
  [ getAllIds, getAllPageIndex, getAllCount, getAllSpinner, getAllError ],
  (ids, pageIndex, count, spinner, error) => {
    return {
      hidden: !!cookie.get('all_accordion_hidden'),
      title: 'My boards',
      type: 'all',
      ids: ids.filter((id, i) => i < pageIndex * BOARDS_PER_PAGE),
      count,
      spinner, 
      error,
    };
  }
);

export const getBoard = (state, { id }) => {
  return state.entities.boards[id];
};

export const makeGetBoard = () => createDeepEqualSelector(
  [ getBoard ],
  identity
);

export const getGroups = createSelector(
  [ getStarredGroup, getAllGroup ],
  (starred, all) => [starred, all]
);
