import React, { PropTypes } from 'react';

const Cards = ({ cards = [] }) => (
    <div className="c-cards">
        {cards.map((card, i) =>
            <div
                key={i}
                className="c-cards__item"
            >
                <div className="c-card">
                    {card.text}
                </div>
            </div>
        )}
    </div>
);

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    }))
};

export default Cards;
