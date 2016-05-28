import React from 'react';
import NotificationsContainer from '../containers/NotificationsContainer';
import Header from './Header';

function App({ children }) {
    return (
        <div className="b-app">
            <Header />
            <div className="b-route-handler">
                {children}
            </div>
            <NotificationsContainer />
        </div>
    );
};

export default App;
