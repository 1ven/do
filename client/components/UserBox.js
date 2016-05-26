import React, { PropTypes, Component } from 'react';
import MenuList from './MenuList';
import Toggle from './Toggle';
import Icon from './Icon';

const UserBox = function ({
    username,
    role,
    avatar,
    onSignOutClick
}) {
    const wrap = (
        <div className="b-user-box__wrap">
            <div className="b-user-box__icon">
                <Icon name="chevron-down" />
            </div>
            <div className="b-user-box__left">
                <span className="b-user-box__username">
                    @{username}
                </span>
                <span className="b-user-box__role">
                    {role}
                </span>
            </div>
            <div className="b-user-box__right">
                <img
                    className="b-user-box__avatar"
                    src={avatar}
                />
            </div>
        </div>
    );

    const menu = (
        <div className="b-user-box__menu">
            <MenuList
                items={[{
                    title: 'Sign out',
                    onClick: onSignOutClick
                }]}
            />
        </div>
    );

    return (
        <div className="b-user-box">
            <Toggle
                link={wrap}
                content={menu}
            />
        </div>
    );
};

UserBox.defaultProps = {
    avatar: 'http://placehold.it/38x38',
    role: 'user'
};

UserBox.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

export default UserBox;
