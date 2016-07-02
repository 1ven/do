import React, { PropTypes } from 'react';
import { getGravatarUrl } from '../utils';
import MenuList from './MenuList';
import Toggle from './Toggle';
import Icon from './Icon';

function UserBox({
  user: {
    username,
    email,
    role,
    avatar,
  },
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
          {role || 'user'}
        </span>
      </div>
      <div className="b-user-box__right">
        <img
          alt="avatar"
          className="b-user-box__avatar"
          src={getGravatarUrl(email)}
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

UserBox.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onSignOutClick: PropTypes.func.isRequired,
  onIndexClick: PropTypes.func.isRequired,
};

export default UserBox;
