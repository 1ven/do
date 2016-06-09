import React, { PropTypes } from 'react';
import Header from './Header';
import NotificationsContainer from '../containers/NotificationsContainer';
import ProgressBarContainer from '../containers/ProgressBarContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function App({ children, location }) {
  return (
    <div className="b-app">
      <ProgressBarContainer />
      <Header />
      <div className="b-route-handler">
        <ReactCSSTransitionGroup
          component="div"
          transitionName="a-fade-enter"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={1}
        >
          {React.cloneElement(children, {
            key: location.pathname,
          })}
        </ReactCSSTransitionGroup>
      </div>
      <NotificationsContainer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
