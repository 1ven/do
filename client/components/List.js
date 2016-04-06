import React, { PropTypes } from 'react';

const List = ({ id, title, cards = [] }) => (
    <div className="c-list">
        <div className="c-list__title">
            {title}
        </div>
        <div className="c-list__cards">
        </div>
    </div>
);

List.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    }))
};

export default List;
