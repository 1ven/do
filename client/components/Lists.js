import React, { PropTypes } from 'react';
import Cards from './Cards';

const Lists = ({ lists = [] }) => (
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
                        <Cards cards={list.cards} />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

Lists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        cards: PropTypes.array
    }))
};

export default Lists;
