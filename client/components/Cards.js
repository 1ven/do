import React, { PropTypes } from 'react';
import InputForm from './InputForm';
import Card from './Card';

const Cards = ({
    cards = [],
    onCardCreate,
    onCardRemoveClick,
    onCardInputFormSubmit,
    onCardTextClick
}) => {
    return (
        <div className="c-cards">
            {cards.map((card, i) =>
                <div
                    key={i}
                    className="c-cards__item"
                >
                    <Card
                        {...card}
                        onRemoveClick={onCardRemoveClick}
                        onInputFormSubmit={onCardInputFormSubmit}
                        onTextClick={onCardTextClick}
                    />
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
    onCardCreate: PropTypes.func.isRequired,
    onCardRemoveClick: PropTypes.func.isRequired,
    onCardInputFormSubmit: PropTypes.func.isRequired,
    onCardTextClick: PropTypes.func.isRequired
};

export default Cards;
