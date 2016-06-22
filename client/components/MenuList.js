import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';

function MenuList({
  items,
  modifiers,
}) {
  const rootClassName = addModifiers('b-menu-list', modifiers);

  return (
    <div className={rootClassName}>
      {items.map((item, i) => (
        <div
          className="b-menu-list__item"
          key={i}
        >
          <a
            className="b-menu-list__link"
            href={item.href}
            onClick={item.onClick}
          >
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
}

MenuList.defaultProps = {
  modifiers: [],
};

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  modifiers: PropTypes.array,
};

export default MenuList;
