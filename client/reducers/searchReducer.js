import * as types from '../constants/actionTypes';
import assign from 'lodash/assign';

function searchReducer(state = {
  results: [],
}, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return assign({}, state, { results: action.payload.result });
    default:
      return state;
  }
}

export default searchReducer;
