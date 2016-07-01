import types from '../../constants/actionTypes';

const inflect = require('i')();

export default function trash(state = {
  ids: [],
  pagesLength: 0,
  isFetching: false,
  error: false,
  lastUpdated: undefined,
}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.TRASH_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.TRASH_FETCH_SUCCESS:
      return {
        ...state,
        ids: payload.result.trash,
        pagesLength: payload.result.pagesLength,
        isFetching: false,
        error: false,
        lastUpdated: payload.receivedAt,
      };
    case types.TRASH_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case types.BOARD_REMOVE_SUCCESS:
    case types.LIST_REMOVE_SUCCESS:
    case types.CARD_REMOVE_SUCCESS:
      return {
        ...state,
        ids: [payload.result.trashItem, ...state.ids],
      };
    case types.TRASH_RESTORE_SUCCESS:
      return {
        ...state,
        ids: state.ids.filter(id => {
          const type = inflect.singularize(payload.request.table);
          return id !== payload.result[type];
        }),
      };
    default:
      return state;
  }
}
