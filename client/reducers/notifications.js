import types from '../constants/actionTypes';
import merge from 'lodash/merge';

const defaults = {
  type: 'info',
};

export default function notifications(state = [], action) {
  const notification = action.payload;

  switch (action.type) {
    case types.NOTIFICATIONS_CREATE_WITH_ID:
      return [...state, merge({}, defaults, notification)];
    case types.NOTIFICATIONS_REMOVE:
      return state.filter(n => n.id !== notification.id);
    default:
      return state;
  }
}
