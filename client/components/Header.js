import React, { PropTypes } from 'react';
import SearchBox from './SearchBox';
import UserBoxContainer from '../containers/UserBoxContainer';

const results = [{
    type: 'Boards',
    items: [{
        title: 'Programming',
        href: ''
    }, {
        title: 'Programmist',
        href: ''
    }, {
        title: 'Programmable',
        href: ''
    }]
}, {
    type: 'Lists',
    items: [{
        title: 'Work',
        href: ''
    }, {
        title: 'Working',
        href: ''
    }, {
        title: 'Worker',
        href: ''
    }]
}];

function Header() {
    return (
        <header className="b-header">
            <div className="b-container">
                <div className="b-header__wrap">
                    <div className="b-header__left">
                        <SearchBox
                            onSubmit={value => console.log(value)}
                            results={results}
                        />
                    </div>
                    <div className="b-header__right">
                        <div className="b-header__item">
                            <UserBoxContainer />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
