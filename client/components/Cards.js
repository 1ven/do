import React, { PropTypes } from 'react';
import Card from './Card';
import Btn from './Btn';

function Cards({
  cards,
  onCardRemoveClick,
  onAddCardBtnClick,
}) {
  return (
    <div className="b-cards">
      {cards.map((card, i) =>
        <div
          key={i}
          className="b-cards__item"
        >
          <Card
            data={card}
            onRemoveClick={onCardRemoveClick}
            href={card.href}
          />
        </div>
      )}
      <div className="b-cards__item">
        <Btn
          text="Add new card"
          modifiers={['full_width', 'sm']}
          onClick={onAddCardBtnClick}
        />
      </div>
    </div>
  );
}

Cards.defaultProps = {
  cards: [],
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })),
  onAddCardBtnClick: PropTypes.func.isRequired,
  onCardRemoveClick: PropTypes.func.isRequired,
};

export default Cards;
