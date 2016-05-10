import React, { PropTypes } from 'react';
import assign from 'lodash/assign';

const Btn = function ({
    text,
    tagName,
    modifiers,
    onClick,
    nodeAttrs
}) {
    return React.createElement(tagName, assign({}, {
        className: 'b-btn',
        onClick
    }, nodeAttrs), text);
};

Btn.defaultProps = {
    modifiers: [],
    tagName: 'a'
};

Btn.propTypes = {
    text: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    modifiers: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    nodeAttrs: PropTypes.object
};

export default Btn;
