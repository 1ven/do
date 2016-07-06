import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';
import DraggableBoardTile from './DraggableBoardTile';
import BoardsSpinner from './BoardsSpinner';

function Boards({
  items = [],
  spinner,
  onRemoveClick,
  onEditClick,
  onToggleStarredClick,
  onMoveTile,
  onDropTile,
}) {
  return (
    <div className="b-boards">
      <div className="b-boards__items">
        {items.map((board, i) =>
          <div
            className="b-boards__item"
            key={board.id}
          >
            <DraggableBoardTile
              onMoveTile={onMoveTile}
              onDropTile={onDropTile}
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
      {spinner ? (
        <div className="b-boards__spinner">
          <BoardsSpinner />
        </div>
      ) : <div />}
    </div>
  );
}

Boards.propTypes = {
  items: PropTypes.array.isRequired,
  spinner: PropTypes.bool,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onToggleStarredClick: PropTypes.func.isRequired,
  onMoveTile: PropTypes.func.isRequired,
  onDropTile: PropTypes.func.isRequired,
};

export default Boards;
