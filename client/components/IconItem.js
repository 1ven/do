import React, { PropTypes } from 'react';
import Icon from './Icon';

function IconItem({
  children,
  iconName,
  iconWidth,
}) {
  return (
    <div className="b-icon-item">
      <div
        className="b-icon-item__icon"
        style={{ width: `${iconWidth}px` }}
      >
        <Icon name={iconName} />
      </div>
      <div className="b-icon-item__text">
        {children}
      </div>
    </div>
  );
}

IconItem.defaultProps = {
  iconWidth: 14,
};

IconItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconWidth: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default IconItem;
