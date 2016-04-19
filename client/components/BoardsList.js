import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import InputForm from './InputForm';

const BoardsList = ({ boards, onBoardCreatorSubmit }) => (
    <div className="b-container">
        <div className="c-boards-list">
            <div className="c-boards-list__items">
                {boards.map((board, i) =>
                    <div
                        className="c-boards-list__item"
                        key={i}
                    >
                        <BoardTile
                            data={board}
                        />
                    </div>
                )}
                <div className="c-boards-list__item" >
                    <div className="b-tile">
                        <InputForm
                            onSubmit={onBoardCreatorSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

BoardsList.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onBoardCreatorSubmit: PropTypes.func.isRequired,
};

export default BoardsList;
