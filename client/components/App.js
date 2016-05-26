import React from 'react';
import ModalContainer from '../containers/ModalContainer';
import NotificationsContainer from '../containers/NotificationsContainer';
import Header from './Header';

function App({ children }) {
    return (
        <div className="b-app">
            <Header />
            <div className="b-route-handler">
                {children}
            </div>
            <ModalContainer />
            <NotificationsContainer />
        </div>
    );
};

export default App;
