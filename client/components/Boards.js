import React, { PropTypes } from 'react';
import DraggableBoardTile from './DraggableBoardTile';

function Boards({
  items = [],
  onRemoveClick,
  onEditClick,
  onToggleStarredClick,
  onMoveTile,
}) {
  return (
    <div className="b-boards">
      {items.map((board, i) =>
        <div
          className="b-boards__item"
          key={board.id}
        >
          <DraggableBoardTile
            index={i}
            onMoveTile={onMoveTile}
            boardTileProps={{
              data: board,
              onRemoveClick,
              onEditClick,
              onToggleStarredClick,
            }}
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