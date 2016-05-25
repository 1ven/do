import React, { PropTypes } from 'react';
import List from './List';

function Lists({
    lists = [],
    onListRemoveClick,
    onListEditClick
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
    onListEditClick: PropTypes.func.isRequired
};

export default Lists;
