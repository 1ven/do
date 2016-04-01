import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';

const BoardsList = ({ boards, onBoardClick }) => (
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
    </div>
);

BoardsList.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onBoardClick: PropTypes.func.isRequired
};

export default BoardsList;
