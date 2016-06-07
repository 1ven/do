const _ = require('lodash');
const escape = require('escape-html');

module.exports = (props) => (
  _.mapValues(props, value => escape(value))
);
