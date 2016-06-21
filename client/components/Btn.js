import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';
import assign from 'lodash/assign';

function Btn({
    text,
    tagName,
    modifiers,
    onClick,
    nodeAttrs,
}) {
  const className = addModifiers('b-btn', modifiers);

  return React.createElement(tagName, assign({}, {
    className,
    onClick,
  }, nodeAttrs), text);
}

Btn.defaultProps = {
  modifiers: [],
  tagName: 'a',
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  nodeAttrs: PropTypes.object,
};

export default Btn;
