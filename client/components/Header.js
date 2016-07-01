import React from 'react';
import { Link } from 'react-router';
import MenuContainer from '../containers/MenuContainer';
import UserBoxContainer from '../containers/UserBoxContainer';
import SearchBoxContainer from '../containers/SearchBoxContainer';

function Header() {
  return (
    <header className="b-header">
      <div className="b-container">
        <div className="b-header__wrap">
          <div className="b-header__left">
            <div className="b-header__item">
              <MenuContainer />
            </div>
            <div className="b-header__item">
              <SearchBoxContainer />
            </div>
          </div>
          <div className="b-header__middle">
            <Link
              className="b-logo"
              to="/"
            >
              Ello
            </Link>
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
}

export default Header;
