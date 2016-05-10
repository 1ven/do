import React, { PropTypes } from 'react';

function Input(props) {
    return (
        <input
            className="b-input"
            type="text"
            {...props}
        />
    );
};

export default Input;
