import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';
import Icon from './Icon';

function Btn({
  text,
  tagName,
  modifiers,
  onClick,
  nodeAttrs,
  spinner,
}) {
  const className = addModifiers('b-btn', [
    ...modifiers,
    ...spinner ? ['has-spinner'] : [],
  ]);
  const children = spinner ? (
    <div>
      {text}
      <div className="b-btn__spinner">
        <Icon name="spinner" />
      </div>
    </div>
  ) : text;

  return React.createElement(tagName, {
    ...nodeAttrs,
    className,
    onClick,
    disabled: spinner,
  }, children);
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
