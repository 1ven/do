const _ = require('lodash');
const escape = require('escape-html');

module.exports = function(props) {
    return _.mapValues(props, value => {
        return escape(value);
    });
};
