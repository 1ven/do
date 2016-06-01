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
        const {
            data: {
                link,
                title,
                listsLength,
                cardsLength
            },
            onRemoveClick
        } = this.props;

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
                                    {listsLength}
                                </IconItem>
                            </div>
                            <div className="b-board-tile__icon-item">
                                <IconItem
                                    iconWidth="14"
                                    iconName="card"
                                >
                                    {cardsLength}
                                </IconItem>
                            </div>
                        </div>
                    </div>
                    <div className="b-board-tile__right">
                        <Link
                            className="b-board-tile__more"
                            to={link}
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
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        listsLength: PropTypes.number.isRequired,
        cardsLength: PropTypes.number.isRequired
    }),
    onRemoveClick: PropTypes.func.isRequired
};

export default BoardTile;
