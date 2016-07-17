import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import cookie from 'js-cookie';
import identity from 'lodash/identity';
import isEqual from 'lodash/isEqual';
import { BOARDS_PER_PAGE } from '../constants/config';

const getStarredIds = (state) => state.pages.main.starred.ids;
const getStarredError = (state) => state.pages.main.starred.error;
const getStarredVisibility = () => !!cookie.get('starred_accordion_hidden');
const getAllIds = (state) => state.pages.main.all.ids;
const getAllPageIndex = (state) => state.pages.main.all.pageIndex;
const getAllCount = (state) => state.pages.main.all.count;
const getAllSpinner = (state) => state.pages.main.all.isFetching && !!state.pages.main.all.lastUpdated;
const getAllError = (state) => state.pages.main.all.error;
const getBoardEntity = (state, { id }) => state.entities.boards[id];
const getAllVisibility = () => !!cookie.get('all_accordion_hidden');

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const getStarredGroup = createSelector(
  [ getStarredIds, getStarredError, getStarredVisibility ],
  (ids, error, hidden) => {
    return {
      title: 'Starred boards',
      type: 'starred',
      ids,
      hidden,
      error,
    };
  }
);

const getAllGroup = createSelector(
  [ getAllIds, getAllPageIndex, getAllCount, getAllSpinner, getAllError, getAllVisibility ],
  (ids, pageIndex, count, spinner, error, hidden) => {
    return {
      title: 'My boards',
      type: 'all',
      ids: ids.filter((id, i) => i < pageIndex * BOARDS_PER_PAGE),
      count,
      spinner, 
      hidden,
      error,
    };
  }
);

export const makeGetBoard = () => createDeepEqualSelector(
  [ getBoardEntity ],
  identity
);

export const getGroups = createSelector(
  [ getStarredGroup, getAllGroup ],
  (starred, all) => [starred, all]
);
