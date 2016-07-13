import React, { PropTypes } from 'react';
import CardContainer from '../containers/CardContainer';
import Btn from './Btn';

function Cards({
  ids,
  listId,
  onAddCardBtnClick,
}) {
  return (
    <div className="b-cards">
      {ids.map((id, i) =>
        <div
          key={id}
          className="b-cards__item"
        >
          <CardContainer
            listId={listId}
            cardId={id}
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
  ids: [],
};

Cards.propTypes = {
  ids: PropTypes.array,
  listId: PropTypes.string.isRequired,
  onAddCardBtnClick: PropTypes.func.isRequired,
};

export default Cards;
