import { CALL_API } from '../middlewares/api';
import { ACTIVITY_ARRAY } from '../schemas';
import * as types from '../constants/actionTypes';

export function getActivity() {
  return {
    [CALL_API]: {
      types: [
        types.ACTIVITY_GET_REQUEST,
        types.ACTIVITY_GET_SUCCESS,
        types.ACTIVITY_GET_ERROR
      ],
      endpoint: '/api/activity',
      schema: ACTIVITY_ARRAY,
      request: {
        method: 'get',
      }
    }
  };
};
