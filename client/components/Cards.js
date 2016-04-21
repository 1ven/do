import React, { PropTypes } from 'react';
import InputForm from './InputForm';

const Cards = ({ cards = [], onCardCreate }) => {
    return (
        <div className="c-cards">
            {cards.map((card, i) =>
                <div
                    key={i}
                    className="c-cards__item"
                >
                    <div className="c-card">
                        {card.text}
                        <a className="c-card__remove">X</a>
                    </div>
                </div>
            )}
            <div className="c-cards__item">
                <InputForm
                    onSubmit={onCardCreate}
                    placeholder="Enter card name"
                />
            </div>
        </div>
    );
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    })),
    onCardCreate: PropTypes.func.isRequired
};

export default Cards;
