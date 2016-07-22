import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Activity({ items }) {
  function crop(title) {
    return title.length > 10 ? title.slice(0, 10) + '...' : title;
  }

  return (
    <div className="b-activity">
      <span className="b-activity__title">Activity</span>
      <div className="b-activity__items">
        {items.map((item, i) => (
          <div
            className="b-activity__item"
            key={i}
          >
            <div className="b-activity__item-text">
              {item.action}&nbsp;'{crop(item.entry.title)}'&nbsp;{item.type}
            </div>
            <span className="b-activity__date">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Activity.defaultProps = {
  items: [],
};

Activity.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      action: PropTypes.string,
      type: PropTypes.string,
      date: PropTypes.string,
      noLink: PropTypes.bool,
      entry: PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string,
      }),
    })
  ),
};

export default Activity;
