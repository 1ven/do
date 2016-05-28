import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

function Card({ data, href }) {
    return (
        <Link
            className="b-card"
            to={href}
        >
            {data.text}
        </Link>
    );
};

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    href: PropTypes.string.isRequired
};

export default Card;
