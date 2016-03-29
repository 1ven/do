export default function (actionTypes) {
    return {
        start(payload) {
            return {
                type: actionTypes[0],
                payload
            };
        },
        success(payload) {
            return {
                type: actionTypes[1],
                payload
            };
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
