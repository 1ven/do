import React from 'react';
import ModalContainer from '../containers/ModalContainer';
import NotificationsContainer from '../containers/NotificationsContainer';
import Header from './Header';

import '../stylesheet/common.scss';

export default ({ children }) => (
    <div>
        <Header
            user={{
                username: 'roaiven',
                role: 'web developer'
            }}
        />
        <div className="b-route-handler">
            {children}
        </div>
        <ModalContainer />
        <NotificationsContainer />
    </div>
);
