import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import inlineSVG from 'svg-inline-react';

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
            <div className="b-board-tile">
                <div className="b-board-tile__top">
                    <div className="b-board-tile__left">
                        {title}
                    </div>
                    <div className="b-board-tile__right">
                        <a
                            className="b-board-tile__remove"
                            onClick={this.handleRemoveClick}
                        >X</a>
                    </div>
                </div>
                <div className="b-board-tile__bottom">
                    <div className="b-board-tile__left">
                    </div>
                    <div className="b-board-tile__right">
                        <Link
                            className="b-board-tile__more"
                            to={`/boards/${id}`}
                        >
                            More
                        </Link>
                    </div>
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
