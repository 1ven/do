import React, { PropTypes } from 'react';
import Icon from './Icon';
import Toggle from './Toggle';

function ToggleMenu({ menu }) {
  const link = (
    <div className="b-toggle-menu__link">
      <Icon name="cog" />
    </div>
  );
  const content = (
    <div className="b-toggle-menu__content">
      {menu}
    </div>
  );

  return (
    <div className="b-toggle-menu">
      <Toggle
        link={link}
        content={content}
        animationName="a-fade-in-down"
      />
    </div>
  );
}

ToggleMenu.propTypes = {
  menu: PropTypes.node.isRequired,
};

export default ToggleMenu;
