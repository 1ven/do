import React, { PropTypes } from 'react';

function Input(props) {
    return (
        <div className="b-input">
            <input
                className="b-input__node"
                type="text"
                {...props}
            />
        </div>
    );
};

export default Input;
