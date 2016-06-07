import _ from 'lodash';

function getAction(type, payload) {
  return _.assign({}, { type }, payload ? { payload } : {});
}

export default function (actionTypes) {
  return {
    request(payload) {
      return getAction(actionTypes[0], payload);
    },
    success(payload) {
      return getAction(actionTypes[1], payload);
    },
    error(message) {
      return {
        type: actionTypes[2],
        payload: new Error(message),
        error: true,
      };
    },
  };
}
