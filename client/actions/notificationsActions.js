import types from '../constants/actionTypes';

export function createNotification(text, type, timeout = 5000) {
  return {
    type: types.NOTIFICATIONS_CREATE,
    payload: {
      text,
      type,
      timeout,
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
