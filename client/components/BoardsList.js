import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';

const BoardsList = ({
    groups,
    onBoardTileRemoveClick,
    onBoardTileEditClick
}) => {
    return (
        <div className="b-boards-list">
            <div className="b-container">
                {groups.map((group, i) => (
                    <div
                        className="b-boards-list__group"
                        key={i}
                    >
                        <span className="b-boards-list__group-title">
                            {group.title}
                            &nbsp;
                            <span className="b-boards-list__count">
                                ({group.boards.length})
                            </span>
                        </span>
                        <div className="b-boards-list__items">
                            {!group.boards.length ? (
                                <div>Boards not found</div>
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
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

BoardsList.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.text,
            boards: PropTypes.array
        })
    ).isRequired,
    onBoardTileRemoveClick: PropTypes.func.isRequired,
    onBoardTileEditClick: PropTypes.func.isRequired
};

export default BoardsList;
