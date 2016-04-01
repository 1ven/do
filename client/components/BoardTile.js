import React, { PropTypes } from 'react';

const BoardTile = ({ data, onClick }) => (
    <a
        className="c-board-tile"
        onClick={() => onClick(data.id)}
    >
        {data.title}
    </a>
);

BoardTile.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default BoardTile;
