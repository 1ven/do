import React, { PropTypes, Component } from 'react';
import times from 'lodash/times';

function CardColors({ colors, onColorClick }) {
  return (
    <div className="b-card-colors">
      {colors.map((item, i) => (
        <span
          className={`
            b-card-colors__item
            ${item.active ? 'b-card-colors__item_active' : ''}
          `}
          key={i}
          style={{
            backgroundColor: item.color,
          }}
          onClick={() => onColorClick(item.id, !item.active)}
        />
      ))}
    </div>
  );
}

CardColors.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  onColorClick: PropTypes.func.isRequired,
};

export default CardColors;
