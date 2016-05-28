import React, { PropTypes } from 'react';
import List from './List';

function Lists({
    lists = [],
    onListRemoveClick,
    onListEditClick,
    boardId
}) {
    return (
        <div className="b-lists">
            {lists.map((list, i) => (
                <div
                    key={i}
                    className="b-lists__item"
                >
                    <List
                        data={list}
                        onRemoveClick={onListRemoveClick}
                        onEditClick={onListEditClick}
                        boardId={boardId}
                    />
                </div>
            ))}
        </div>
    );
};

Lists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        cards: PropTypes.array
    })),
    onListRemoveClick: PropTypes.func.isRequired,
    onListEditClick: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired
};

export default Lists;
