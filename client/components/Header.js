import React, { PropTypes } from 'react';
import UserBoxContainer from '../containers/UserBoxContainer';

function Header() {
    return (
        <header className="b-header">
            <div className="b-container">
                <div className="b-header__wrap">
                    <div className="b-header__left">
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
