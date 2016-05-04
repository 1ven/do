const _ = require('lodash');
const relationsChecker = require('../utils/relationsChecker');

module.exports = function secureController(Controller, methods) {
    const wrappedMethods = methods.reduce((acc, method) => {
        return _.assign({}, acc, {
            [method]: function (req, res, next) {
                return wrapMethod.call(this, Controller, method, req, res, next);
            }
        });
    }, {});
    return _.assign({}, Controller, wrappedMethods);
};

function wrapMethod(Controller, method, req, res, next) {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    return relationsChecker.check({
        users: userId,
        [this.Model.table]: id
    }).then(areRelate => {
        if (!areRelate) {
            res.status(403).json();
            return;
        }
        return Controller[method].call(this, req, res, next);
    });
};
