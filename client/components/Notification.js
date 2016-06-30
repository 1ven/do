import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';

function Notification({
  id,
  text,
  type,
  subtitle,
  onClick,
}) {
  return (
    <div
      className={
        addModifiers(
          'b-notification',
          [`type_${type}`]
        )
      }
      onClick={() => onClick(id)}
    >
      {subtitle ? (
        <span className="b-notification__subtitle">
          {subtitle}:
        </span>
      ) : <div />}
      {text}
    </div>
  );
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Notification;
