import React, { PropTypes } from 'react';

const Btn = function ({
    text,
    modifiers,
    onClick,
    href
}) {
    return (
        <a
            className="b-btn"
            href={href}
            onClick={onClick}
        >
            {text}
        </a>
    );
};

Btn.defaultProps = {
    modifiers: []
};

Btn.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string
};

export default Btn;
