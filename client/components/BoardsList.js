import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import Icon from './Icon';
import Toggle from './Toggle';

function BoardsList({
  groups,
  onBoardTileRemoveClick,
  onBoardTileEditClick,
  onBoardTileToggleStarredClick,
}) {
  return (
    <div className="b-boards-list">
      <div className="b-container">
        {groups.map((group, i) => (
          <div
            className="b-boards-list__group"
            key={i}
          >
            <Toggle
              link={
                <div className="b-boards-list__top">
                  <span className="b-boards-list__group-title">
                    {group.title}
                    &nbsp;
                    <span className="b-boards-list__count">
                      ({group.boards.length})
                    </span>
                  </span>
                  <span className="b-boards-list__line" />
                  <div className="b-boards-list__toggle-icon">
                    <Icon name="chevron-down" />
                  </div>
                </div>
              }
              content={
                <div className="b-boards-list__items">
                  {!group.boards.length ? (
                    <div className="b-boards-list__not-found">
                      Boards not found
                    </div>
                    ) : (
                    group.boards.map((board, i) =>
                      <div
                        className="b-boards-list__item"
                        key={i}
                      >
                        <BoardTile
                          data={board}
                          onRemoveClick={onBoardTileRemoveClick}
                          onEditClick={onBoardTileEditClick}
                          onToggleStarredClick={onBoardTileToggleStarredClick}
                        />
                      </div>
                    )
                  )}
                </div>
              }
              isActive
            />
          </div>
        ))}
      </div>
    </div>
  );
}

BoardsList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.text,
      boards: PropTypes.array,
    })
  ).isRequired,
  onBoardTileRemoveClick: PropTypes.func.isRequired,
  onBoardTileEditClick: PropTypes.func.isRequired,
  onBoardTileToggleStarredClick: PropTypes.func.isRequired,
};

export default BoardsList;
