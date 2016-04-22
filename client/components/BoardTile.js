import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class BoardTile extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }

    handleRemoveClick() {
        const { onRemoveClick, id } = this.props;
        onRemoveClick(id);
    }

    render() {
        const { id, title, onRemoveClick } = this.props;
        return (
            <div className="c-board-tile">
                <div className="c-board-tile__top">
                    <div className="c-board-tile__top-left">
                        {title}
                    </div>
                    <div className="c-board-tile__top-right">
                        <a
                            className="c-board-tile__remove"
                            onClick={this.handleRemoveClick}
                        >X</a>
                    </div>
                </div>
                <div className="c-board-tile__body">
                    <Link
                        className="c-board-tile__more"
                        to={`/boards/${id}`}
                    >
                        More
                    </Link>
                </div>
            </div>
        );
    }
};

BoardTile.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func.isRequired
};

export default BoardTile;
