import React, { PropTypes } from 'react';
import InputForm from './InputForm';
import List from './List';

const Lists = ({
    lists = [],
    onListCreate,
    onListRemoveClick
}) => (
    <div className="c-lists">
        {lists.map((list, i) => (
            <div
                key={i}
                className="c-lists__item"
            >
                <List
                    id={list.id}
                    title={list.title}
                    cardsIds={list.cards}
                    onRemoveClick={onListRemoveClick}
                />
            </div>
        ))}
        <div className="c-lists__item">
            <div className="b-tile">
                <InputForm
                    onSubmit={onListCreate}
                    placeholder="Enter list name"
                />
            </div>
        </div>
    </div>
);

Lists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        cards: PropTypes.array
    })),
    onListCreate: PropTypes.func.isRequired,
    onListRemoveClick: PropTypes.func.isRequired
};

export default Lists;
