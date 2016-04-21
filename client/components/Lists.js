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
                <div className="b-list b-tile">
                    <div className="b-tile__top">
                        <div className="b-tile__top-left">
                            {list.title}
                        </div>
                        <div className="b-tile__top-right">
                            <a>X</a>
                        </div>
                    </div>
                    <div className="b-tile__body">
                        <CardsContainer
                            listId={list.id}
                            cardsIds={list.cards}
                        />
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
