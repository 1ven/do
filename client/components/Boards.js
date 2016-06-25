import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';

function Boards({
  items = [],
  onRemoveClick,
  onEditClick,
  onToggleStarredClick,
}) {
  return (
    <div className="b-boards">
      {items.map((board, i) =>
        <div
          className="b-boards__item"
          key={i}
        >
          <BoardTile
            data={board}
            onRemoveClick={onRemoveClick}
            onEditClick={onEditClick}
            onToggleStarredClick={onToggleStarredClick}
          />
        </div>
      )}
    </div>
  );
}

Boards.propTypes = {
  items: PropTypes.array.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onToggleStarredClick: PropTypes.func.isRequired,
};

export default Boards;
