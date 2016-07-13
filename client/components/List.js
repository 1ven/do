import React, { PropTypes, Component } from 'react';
import { addModifiers } from '../utils';
import CardsContainer from '../containers/CardsContainer';
import MenuList from './MenuList';
import ToggleMenu from './ToggleMenu';

function List({
  id,
  title,
  cards,
  boardId,
  onRemoveClick,
  onEditClick,
}) {
  return (
    <div className="b-list">
      <div className="b-list__top">
        <span className="b-list__title">
          {title}
        </span>
        <div className="b-list__menu">
          <ToggleMenu menu={
            <MenuList
              modifiers={['sm']}
              items={[
                { title: 'Edit', onClick: () => onEditClick(id) },
                { title: 'Remove', onClick: () => onRemoveClick(id) },
              ]}
            />
          } />
        </div>
      </div>
      <div className="b-list__body">
        <CardsContainer
          listId={id}
          boardId={boardId}
          cardsIds={cards}
        />
      </div>
    </div>
  );
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array,
  boardId: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default List;
