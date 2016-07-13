import { createSelector } from 'reselect';
import cookie from 'js-cookie';
import { BOARDS_PER_PAGE } from '../constants/config';

const getBoardsEntities = (state) => state.entities.boards;
const getIds = (state, { ids }) => ids;
const getStarredIds = (state) => state.pages.main.starred.ids;
const getAllIds = (state) => state.pages.main.all.ids;
const getAllPageIndex = (state) => state.pages.main.all.pageIndex;
const getAllCount = (state) => state.pages.main.all.count;
const getAllSpinner = (state) => state.pages.main.all.isFetching && !!state.pages.main.all.lastUpdated;

const getStarredGroup = createSelector(
  [ getStarredIds ],
  (ids) => {
    return {
      hidden: !!cookie.get('starred_accordion_hidden'),
      title: 'Starred boards',
      type: 'starred',
      ids,
    };
  }
);

const getAllGroup = createSelector(
  [ getAllIds, getAllPageIndex, getAllCount, getAllSpinner ],
  (ids, pageIndex, count, spinner) => {
    return {
      hidden: !!cookie.get('all_accordion_hidden'),
      title: 'My boards',
      type: 'all',
      ids: ids.filter((id, i) => i < pageIndex * BOARDS_PER_PAGE),
      count,
      spinner, 
    };
  }
);

export const makeGetVisibleBoards = () => createSelector(
  [ getBoardsEntities, getIds ],
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getGroups = createSelector(
  [ getStarredGroup, getAllGroup ],
  (starred, all) => [starred, all]
);
