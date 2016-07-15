import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import Icon from './Icon';

function Card({
  id,
  text,
  link,
  colors,
  onRemoveClick,
}) {
  function handleRemoveClick(e) {
    e.stopPropagation();

    onRemoveClick(id);
  }

  function handleClick(e) {
    e.preventDefault();

    browserHistory.push(link);
  }

  return (
    <a
      className="b-card"
      onClick={handleClick}
    >
      <div className="b-card__text">
        {text}
      </div>
      {colors.length ? (
        <div className="b-card__colors">
          {colors.map((color, i) => (
            <span
              className="b-card__color"
              key={i}
              style={{
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      ) : null}
      <span
        className="b-card__remove"
        onClick={handleRemoveClick}
      >
        <Icon name="cross" />
      </span>
    </a>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default Card;
