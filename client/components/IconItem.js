import React, { PropTypes } from 'react';
import Icon from './Icon';

const IconItem = function ({
    children,
    iconName,
    iconWidth
}) {
    return (
        <div className="b-icon-item">
            <div
                className="b-icon-item__icon"
                style={{ width: iconWidth }}
            >
                <Icon name={iconName} />
            </div>
            <div className="b-icon-item__text">
                {children}
            </div>
        </div>
    );
};

IconItem.defaultProps = {
    iconWidth: 14
};

IconItem.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconWidth: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default IconItem;
