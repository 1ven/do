import React, { PropTypes } from 'react';
import addModifiers from '../utils/addModifiers';

function Notifications({
  items,
  onNotificationClick,
}) {
  if (items.length) {
    return (
      <div className="b-notifications">
        {items.map((notification, i) => {
          const className = addModifiers('b-notification', [`type_${notification.type}`]);
          return (
            <div
              className="b-notifications__item"
              key={i}
            >
              <div
                className={className}
                onClick={() => onNotificationClick(notification.id)}
              >
                {notification.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div />;
}

Notifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onNotificationClick: PropTypes.func.isRequired,
};

export default Notifications;
