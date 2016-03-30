import _ from 'lodash';

export default function (actionTypes) {
    return {
        start(payload) {
            return getAction(actionTypes[0], payload);
        },
        success(payload) {
            return getAction(actionTypes[1], payload);
        },
        error(message) {
            return {
                type: actionTypes[2],
                payload: new Error(message),
                error: true
            };
        }
    };
};

function getAction(type, payload) {
    return _.assign({}, { type }, payload ? { payload } : {});
};
