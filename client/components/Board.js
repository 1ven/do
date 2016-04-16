import React, { PropTypes } from 'react';
import Lists from './Lists';

const Board = ({ id, title, lists = [] }) => (
    <div className="b-container">
        <div className="c-board">
            <div className="c-board__lists">
                <Lists lists={lists} />
            </div>
        </div>
    </div>
);

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    lists: PropTypes.array
};

export default Board;
