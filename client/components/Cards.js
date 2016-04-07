import React, { PropTypes } from 'react';
import Card from './Card';

const Cards = ({ cards = [] }) => (
    <div className="c-cards">
        {cards.map((card, i) =>
            <div
                key={i}
                className="c-cards__item"
            >
                <Card {...card} />
            </div>
        )}
    </div>
);

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }))
};

export default Cards;
