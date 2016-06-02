import React from 'react';
import NotificationsContainer from '../containers/NotificationsContainer';
import Header from './Header';
import ProgressBar from './ProgressBar';

function App({ children }) {
    return (
        <div className="b-app">
            <ProgressBar progress={50} />
            <Header />
            <div className="b-route-handler">
                {children}
            </div>
            <NotificationsContainer />
        </div>
    );
};

export default App;
