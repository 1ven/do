import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import BoardCreator from './BoardCreator';

const BoardsList = ({ boards, onBoardClick, onBoardCreatorSubmit }) => (
    <div
        className="c-boards-list">
        {boards.map((board, i) =>
            <div
                className="c-boards-list__item"
                key={i}
            >
                <BoardTile
                    onClick={onBoardClick}
                    data={board}
                />
            </div>
        )}
        <div
            className="c-boards-list__item"
        >
            <BoardCreator
                onSubmit={onBoardCreatorSubmit}
            />
        </div>
    </div>
);

BoardsList.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onBoardCreatorSubmit: PropTypes.func.isRequired
};

export default BoardsList;
