import React, { PropTypes } from 'react';
import DraggableCard from './DraggableCard';
import Btn from './Btn';

function Cards({
  cards,
  listId,
  onCardRemoveClick,
  onAddCardBtnClick,
  onMoveCard,
  onDropCard,
}) {
  return (
    <div className="b-cards">
      {cards.map((card, i) =>
        <div
          key={card.id}
          className="b-cards__item"
        >
          <DraggableCard
            onMoveCard={onMoveCard}
            onDropCard={onDropCard}
            listId={listId}
            cardProps={{
              ...card,
              onRemoveClick: onCardRemoveClick,
            }}
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
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  onAddCardBtnClick: PropTypes.func.isRequired,
  onCardRemoveClick: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
  onDropCard: PropTypes.func.isRequired,
};

export default Cards;
