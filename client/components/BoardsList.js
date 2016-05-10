import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import InputForm from './InputForm';
import BottomBox from './BottomBox';
import Btn from './Btn';

const BoardsList = ({
    boards,
    onBoardTileRemoveClick,
    onAddBoardBtnClick
}) => {
    const addBoardBtn = (
        <Btn
            text="Add new board"
            onClick={onAddBoardBtnClick}
        />
    );

    return (
        <div className="c-boards-list">
            <div className="b-container">
                <div className="c-boards-list__items">
                    {boards.map((board, i) =>
                        <div
                            className="c-boards-list__item"
                            key={i}
                        >
                            <BoardTile
                                {...board}
                                onRemoveClick={onBoardTileRemoveClick}
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
    onAddBoardBtnClick: PropTypes.func.isRequired
};

export default BoardsList;
