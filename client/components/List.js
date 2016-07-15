import React, { PropTypes, Component } from 'react';
import { addModifiers } from '../utils';
import MenuList from './MenuList';
import ToggleMenu from './ToggleMenu';
import Cards from './Cards';

function List({
  id,
  title,
  cards,
  boardId,
  onRemoveClick,
  onEditClick,
  onAddCardBtnClick,
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
        <Cards
          ids={cards}
          boardId={boardId}
          listId={id}
          onAddCardBtnClick={onAddCardBtnClick}
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
  onAddCardBtnClick: PropTypes.func.isRequired,
};

export default List;
