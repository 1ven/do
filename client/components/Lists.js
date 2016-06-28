import React, { PropTypes } from 'react';
import DraggableList from './DraggableList';
import List from './List';
import Masonry from 'react-masonry-component';

function Lists({
  lists = [],
  boardId,
  onListRemoveClick,
  onListEditClick,
  onListCardMove,
}) {
  return (
    <Masonry className="b-lists">
      {lists.map((list, i) => (
        <div
          key={list.id}
          className="b-lists__item"
        >
          <DraggableList
            onCardMove={onListCardMove}
            listProps={{
              data: list,
              boardId: boardId,
              onRemoveClick: onListRemoveClick,
              onEditClick: onListEditClick,
            }}
          />
        </div>
      ))}
    </Masonry>
  );
}

Lists.propTypes = {
  lists: PropTypes.array,
  boardId: PropTypes.string.isRequired,
  onListRemoveClick: PropTypes.func.isRequired,
  onListEditClick: PropTypes.func.isRequired,
  onListCardMove: PropTypes.func.isRequired,
};

export default Lists;
