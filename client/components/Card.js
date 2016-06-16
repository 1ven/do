import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Card({ id, text, link, colors }) {
  return (
    <Link
      className="b-card"
      to={link}
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
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
};

export default Card;
