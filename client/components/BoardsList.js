import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import InputForm from './InputForm';
import BottomBox from './BottomBox';
import Btn from './Btn';

const BoardsList = ({
    boards,
    onBoardTileRemoveClick,
    onBoardTileEditClick,
    onAddBoardBtnClick
}) => {
    const addBoardBtn = (
        <Btn
            text="Add new board"
            onClick={onAddBoardBtnClick}
        />
    );

    return (
        <div className="b-boards-list">
            <div className="b-container">
                <div className="b-boards-list__items">
                    {boards.map((board, i) =>
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
                    )}
                </div>
            </div>
            <BottomBox
                button={addBoardBtn}
            />
        </div>
    );
};

BoardsList.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onBoardTileRemoveClick: PropTypes.func.isRequired,
    onBoardTileEditClick: PropTypes.func.isRequired,
    onAddBoardBtnClick: PropTypes.func.isRequired
};

export default BoardsList;
