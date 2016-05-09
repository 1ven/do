import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import IconItem from './IconItem';
import MenuList from './MenuList';
import Toggle from './Toggle';

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

        const menuLink = (
            <div className="b-board-tile__menu-link">
                <Icon name="cog" />
            </div>
        );

        const menuWrap = (
            <div className="b-board-tile__menu-wrap">
                <MenuList
                    modifiers={['sm']}
                    items={[
                        { title: 'Edit', href: '/sign-out' },
                        { title: 'Remove', href: '/sign-out' }
                    ]}
                />
            </div>
        );

        return (
            <div className="b-board-tile">
                <div className="b-board-tile__top">
                    <div className="b-board-tile__left">
                        <span className="b-board-tile__title">{title}</span>
                    </div>
                    <div className="b-board-tile__right">
                        <div className="b-board-tile__menu">
                            <Toggle
                                link={menuLink}
                                content={menuWrap}
                            />
                        </div>
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func.isRequired
};

export default BoardTile;
