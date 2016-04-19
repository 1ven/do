import React, { PropTypes } from 'react';
import InputForm from './InputForm';
import CardsContainer from '../containers/CardsContainer';

const Lists = ({ lists = [], onListCreate }) => (
    <div className="c-lists">
        {lists.map((list, i) => (
            <div
                key={i}
                className="c-lists__item"
            >
                <div className="c-list">
                    <div className="c-list__title">
                        {list.title}
                    </div>
                    <div className="c-list__cards">
                        <CardsContainer cardsIds={list.cards} />
                    </div>
                </div>
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
    onListCreate: PropTypes.func.isRequired
};

export default Lists;
