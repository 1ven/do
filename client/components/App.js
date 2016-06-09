import React, { PropTypes } from 'react';
import Header from './Header';
import NotificationsContainer from '../containers/NotificationsContainer';
import ProgressBarContainer from '../containers/ProgressBarContainer';
import Scrollbar from './Scrollbar';

function App({ children }) {
  return (
    <Scrollbar>
      <div className="b-app">
        <ProgressBarContainer />
        <Header />
        <div className="b-route-handler">
          {children}
        </div>
        <NotificationsContainer />
      </div>
    </Scrollbar>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
