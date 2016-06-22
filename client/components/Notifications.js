import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';
import Animation from './Animation';

function Notifications({
  items,
  onNotificationClick,
}) {
  return (
    <Animation
      name="a-fade-in"
      className="b-notifications"
    >
      {items.map((notification, i) =>
        <div
          className="b-notifications__item"
          key={i}
        >
          <div
            className={
              addModifiers(
                'b-notification',
                [`type_${notification.type}`]
              )
            }
            onClick={() => onNotificationClick(notification.id)}
          >
            {notification.text}
          </div>
        </div>
      )}
    </Animation>
  );

  return <div />;
}

Notifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onNotificationClick: PropTypes.func.isRequired,
};

export default Notifications;
