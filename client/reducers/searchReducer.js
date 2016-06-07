import * as types from '../constants/actionTypes';

function searchReducer(state = {
  results: [],
}, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return {
        results: action.payload.result
      };
    default:
      return state;
  }
}

export default searchReducer;
