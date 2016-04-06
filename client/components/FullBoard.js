import React, { PropTypes } from 'react';
import ListContainer from '../containers/ListContainer';

const FullBoard = ({ id, title, lists }) => (
    <div className="b-container">
        <div className="c-full-board">
            {lists.map((list, i) =>
                <div
                    key={i}
                    className="c-full-board__col"
                >
                    <ListContainer {...list} />
                </div>
            )}
        </div>
    </div>
);

FullBoard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(
            PropTypes.number.isRequired
        )
    }).isRequired).isRequired
};

export default FullBoard;
