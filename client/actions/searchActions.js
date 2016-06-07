import { CALL_API } from '../middlewares/api';
import * as types from '../constants/actionTypes';

export function search(query) {
  return {
    [CALL_API]: {
      types: [
        types.SEARCH_REQUEST,
        types.SEARCH_SUCCESS,
        types.SEARCH_ERROR,
      ],
      endpoint: '/api/search',
      request: {
        method: 'post',
        body: {
          query,
        },
      },
    },
  };
};
