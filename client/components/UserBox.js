import React, { PropTypes } from 'react';
import MenuList from './MenuList';
import Toggle from './Toggle';
import Icon from './Icon';

function UserBox({
  username,
  role,
  avatar,
  onSignOutClick,
  onIndexClick,
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
          alt="avatar"
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
          title: 'Main page',
          onClick: onIndexClick,
        }, {
          title: 'Sign out',
          onClick: onSignOutClick,
        }]}
      />
    </div>
  );

  return (
    <div className="b-user-box">
      <Toggle
        link={wrap}
        content={menu}
        animationName="a-fade-in-down"
      />
    </div>
  );
}

UserBox.defaultProps = {
  role: 'user',
};

UserBox.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  onIndexClick: PropTypes.func.isRequired,
};

export default UserBox;
