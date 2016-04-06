import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BoardTile = ({ data, onClick }) => (
    <Link
        to={`/boards/${data.id}`}
        className="c-board-tile"
        onClick={() => onClick(data.id)}
    >
        {data.title}
    </Link>
);

BoardTile.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default BoardTile;
