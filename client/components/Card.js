import React, { PropTypes } from 'react';

const Card = ({ id, text }) => (
    <div className="c-card">
        {text}
    </div>
);

Card.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

export default Card;
