import React, { PropTypes } from 'react';
import ActivityContainer from '../containers/ActivityContainer';
import Icon from './Icon';
import Toggle from './Toggle';
import Scrollbar from './Scrollbar';
import { IndexLink, Link } from 'react-router';

function Menu({ onSignOutClick }) {
  const link = (
    <div className="b-menu__link">
      <Icon name="menu" />
    </div>
  );
  const menu = (
    <div className="b-menu__body">
      <div className="b-menu__items">
        <div className="b-menu__item">
          <IndexLink
            to="/"
            className="b-menu__item-link"
            activeClassName="b-menu__item-link_active"
            data-title="Main page"
          >
            Main page
          </IndexLink>
        </div>
        <div className="b-menu__item">
          <a
            className="b-menu__item-link"
            data-title="Sign out"
            onClick={onSignOutClick}
          >
            Sign out
          </a>
        </div>
      </div>
      <Scrollbar>
        <div className="b-menu__activity">
          <ActivityContainer />
        </div>
      </Scrollbar>
    </div>
  );

  return (
    <div className="b-menu">
      <Toggle
        link={link}
        content={menu}
        animationName="a-slide-in-left"
        animationDuration={400}
      />
    </div>
  );
}

Menu.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
};

export default Menu;
