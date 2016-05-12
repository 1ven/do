import React, { Component, PropTypes } from 'react';
import InputForm from './InputForm';

function Card({ data, onClick }) {
    return (
        <div
            className="b-card"
            onClick={() => onClick(data.id)}
        >
            {data.text}
        </div>
    );
};

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func.isRequired
};

export default Card;
