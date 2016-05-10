import React, { PropTypes } from 'react';
import ListsContainer from '../containers/ListsContainer';
import BottomBox from './BottomBox';
import Btn from './Btn';

function Board({ data, onAddListBtnClick }) {
    const addListBtn = (
        <Btn
            text="Add new list"
            onClick={onAddListBtnClick}
        />
    );

    return (
        <div>
            <div className="b-board">
                <div className="b-container">
                    <div className="b-board__top">
                        <span className="b-board__title">
                            {data.title}
                        </span>
                        <span className="b-board__description">
                            Some text with board description
                        </span>
                    </div>
                    <div className="b-board__lists">
                        <ListsContainer
                            boardId={data.id}
                            listsIds={data.lists}
                        />
                    </div>
                </div>
            </div>
            <BottomBox button={addListBtn} />
        </div>
    );
};

Board.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        lists: PropTypes.arrayOf(
            PropTypes.number
        )
    }).isRequired,
    onAddListBtnClick: PropTypes.func.isRequired
};

export default Board;
