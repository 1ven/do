import types from '../constants/actionTypes';

export function createNotification(text, type) {
  return {
    type: types.NOTIFICATIONS_CREATE,
    payload: {
      text,
      type,
    },
  };
}

export function createNotificationWithId(id, text, type) {
  return {
    type: types.NOTIFICATIONS_CREATE_WITH_ID,
    payload: {
      id,
      text,
      type,
    },
  };
}

export function removeNotification(id) {
  return {
    type: types.NOTIFICATIONS_REMOVE,
    payload: {
      id,
    },
  };
};
