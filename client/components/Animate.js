import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Animate({ children, name }) {
  return (
    <ReactCSSTransitionGroup
      transitionName={name}
      transitionEnterTimeout={150}
      transitionLeaveTimeout={150}
    >
      {children}
    </ReactCSSTransitionGroup>
    );
}

Animate.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default Animate;
