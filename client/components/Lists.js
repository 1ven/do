import React, { PropTypes } from 'react';
import InputForm from './InputForm';
import List from './List';

const Lists = ({
    lists = [],
    onListRemoveClick
}) => (
    <div className="b-lists">
        {lists.map((list, i) => (
            <div
                key={i}
                className="b-lists__item"
            >
                <List
                    id={list.id}
                    title={list.title}
                    cardsIds={list.cards}
                    onRemoveClick={onListRemoveClick}
                />
            </div>
        ))}
    </div>
);

Lists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        cards: PropTypes.array
    })),
    onListRemoveClick: PropTypes.func.isRequired
};

export default Lists;
