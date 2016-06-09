import React, { PropTypes } from 'react';
import Header from './Header';
import NotificationsContainer from '../containers/NotificationsContainer';
import ProgressBarContainer from '../containers/ProgressBarContainer';

function App({ children }) {
  return (
    <div className="b-app">
      <ProgressBarContainer />
      <Header />
      <div className="b-route-handler">
        {children}
      </div>
      <NotificationsContainer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
