import React, { PropTypes } from 'react';
import ListsContainer from '../containers/ListsContainer';

const Board = ({ id, title, lists = [] }) => (
    <div className="b-container">
        <div className="c-board">
            <div className="c-board__lists">
                <ListsContainer listsIds={lists} />
            </div>
        </div>
    </div>
);

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.number)
};

export default Board;
