import React from 'react';
import ActivityContainer from '../containers/ActivityContainer';
import Icon from './Icon';
import Toggle from './Toggle';

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
            data-title="Sign out"
          >
            Sign out
          </a>
        </div>
      </div>
      <div className="b-menu__activity">
        <ActivityContainer />
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
