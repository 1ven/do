import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Animation({
  children,
  name,
  className,
  duration,
}) {
  return (
    <ReactCSSTransitionGroup
      transitionName={name}
      transitionEnterTimeout={duration}
      transitionLeaveTimeout={duration}
      className={className}
    >
      {children}
    </ReactCSSTransitionGroup>
    );
}

Animation.defaultProps = {
  duration: 150,
};

Animation.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number,
  className: PropTypes.string,
};

export default Animation;
