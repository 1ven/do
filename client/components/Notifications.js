import React, { PropTypes } from 'react';
import Notification from './Notification';
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
      {items.map((n, i) =>
        <div
          className="b-notifications__item"
          key={n.id}
        >
          <Notification
            id={n.id}
            text={n.text}
            type={n.type}
            subtitle={n.type === 'tip' ? 'Tip' : null}
            onClick={onNotificationClick}
          />
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
