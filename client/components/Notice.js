import React, { PropTypes } from 'react';

const Notice = ({ message, type = 'info', onClick }) => (
    <div className="c-notice" >
        <a
            className={`c-notice__message c-notice__message_${type}`}
            onClick={onClick}
        >
            {message}
        </a>
    </div>
);

Notice.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
};

export default Notice;
