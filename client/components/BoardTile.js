import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BoardTile = ({ data }) => (
    <div className="b-tile">
        <div className="b-tile__top">
            <div className="b-tile__top-left">
                {data.title}
            </div>
            <div className="b-tile__top-right">
                <a>X</a>
            </div>
        </div>
        <div className="b-tile__body">
            <Link
                className="b-white-link"
                to={`/boards/${data.id}`}
            >
                More
            </Link>
        </div>
    </div>
);

BoardTile.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default BoardTile;
