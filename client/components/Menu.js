import React from 'react';
import ActivityContainer from '../containers/ActivityContainer';
import Icon from './Icon';
import Toggle from './Toggle';
import Scrollbar from './Scrollbar';

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

export default Menu;
