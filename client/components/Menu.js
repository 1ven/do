import React, { Component, PropTypes } from 'react';
import Activity from './Activity';
import Icon from './Icon';
import Toggle from './Toggle';

const activity = [{
    id: 1,
    action: 'Created',
    type: 'card',
    date: '18 Jan at 01:27',
    entry: {
        title: 'Buy milk at shop tomorrow and meet Tom',
        link: ''
    }
}, {
    id: 2,
    action: 'Updated',
    type: 'board',
    date: '17 Jan at 08:22',
    entry: {
        title: 'Business',
        link: ''
    }
}, {
    id: 2,
    action: 'Archived',
    type: 'list',
    date: '14 Jan at 14:18',
    entry: {
        title: 'Work sheets',
        link: ''
    }
}, {
    id: 1,
    action: 'Created',
    type: 'card',
    date: '18 Jan at 01:27',
    entry: {
        title: 'Buy milk at shop tomorrow and meet Tom',
        link: ''
    }
}, {
    id: 2,
    action: 'Updated',
    type: 'board',
    date: '17 Jan at 08:22',
    entry: {
        title: 'Business',
        link: ''
    }
}, {
    id: 2,
    action: 'Archived',
    type: 'list',
    date: '14 Jan at 14:18',
    entry: {
        title: 'Work sheets',
        link: ''
    }
}, {
    id: 1,
    action: 'Created',
    type: 'card',
    date: '18 Jan at 01:27',
    entry: {
        title: 'Buy milk at shop tomorrow and meet Tom',
        link: ''
    }
}, {
    id: 2,
    action: 'Updated',
    type: 'board',
    date: '17 Jan at 08:22',
    entry: {
        title: 'Business',
        link: ''
    }
}, {
    id: 2,
    action: 'Archived',
    type: 'list',
    date: '14 Jan at 14:18',
    entry: {
        title: 'Work sheets',
        link: ''
    }
}];

function Menu() {
    const link = (
        <div className="b-menu__link">
            <Icon name="menu" />
        </div>
    );
    const menu = (
        <div className="b-menu__body">
            <div className="b-menu__items">
                <div className="b-menu__item">
                    <a
                        className="b-menu__item-link"
                        data-title="Main page"
                    >
                        Main page
                    </a>
                </div>
                <div className="b-menu__item">
                    <a
                        className="b-menu__item-link"
                        data-title="Profile"
                    >
                        Profile
                    </a>
                </div>
                <div className="b-menu__item">
                    <a
                        className="b-menu__item-link"
                        data-title="Sign out"
                    >
                        Sign out
                    </a>
                </div>
            </div>
            <div className="b-menu__activity">
                <Activity items={activity} />
            </div>
        </div>
    );

    return (
        <div className="b-menu">
            <Toggle
                link={link}
                content={menu}
            />
        </div>
    );
}

export default Menu;
