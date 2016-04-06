import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BoardTile = ({ data }) => (
    <Link
        to={`/boards/${data.id}`}
        className="c-board-tile"
    >
        {data.title}
    </Link>
);

BoardTile.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default BoardTile;
