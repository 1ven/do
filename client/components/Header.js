import React, { PropTypes } from 'react';
import UserBox from './UserBox';

const Header = function ({ user, onUserBoxSignOutClick }) {
    return (
        <header className="b-header">
            <div className="b-container">
                <div className="b-header__wrap">
                    <div className="b-header__left">
                    </div>
                    <div className="b-header__right">
                        <div className="b-header__item">
                            <UserBox
                                {...user}
                                onSignOutClick={onUserBoxSignOutClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired
};

export default Header;
