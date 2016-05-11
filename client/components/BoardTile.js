import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import IconItem from './IconItem';
import MenuList from './MenuList';
import ToggleMenu from './ToggleMenu';

class BoardTile extends Component {
    constructor(props) {
        super(props);

        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleRemoveClick() {
        const { onRemoveClick, data: { id } } = this.props;
        onRemoveClick(id);
    }

    handleEditClick() {
        const { onEditClick, data } = this.props;
        onEditClick(data);
    }

    render() {
        const { data: { id, title }, onRemoveClick } = this.props;

        const menu = (
            <MenuList
                modifiers={['sm']}
                items={[
                    { title: 'Edit', onClick: this.handleEditClick },
                    { title: 'Remove', onClick: this.handleRemoveClick }
                ]}
            />
        );

        return (
            <div className="b-board-tile">
                <div className="b-board-tile__top">
                    <div className="b-board-tile__left">
                        <span className="b-board-tile__title">{title}</span>
                    </div>
                    <div className="b-board-tile__right">
                        <ToggleMenu menu={menu} />
                    </div>
                </div>
                <div className="b-board-tile__bottom">
                    <div className="b-board-tile__left">
                        <div className="b-board-tile__board-info">
                            <div className="b-board-tile__icon-item">
                                <IconItem
                                    iconWidth="15"
                                    iconName="list"
                                >
                                    4
                                </IconItem>
                            </div>
                            <div className="b-board-tile__icon-item">
                                <IconItem
                                    iconWidth="14"
                                    iconName="card"
                                >
                                    10
                                </IconItem>
                            </div>
                        </div>
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
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }),
    onRemoveClick: PropTypes.func.isRequired
};

export default BoardTile;
