import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signOut } from '../actions/signActions';
import ModalContainer from './ModalContainer';
import NotificationsContainer from './NotificationsContainer';
import Header from '../components/Header';

const App = ({
    children,
    signOut
}) => (
    <div className="b-app">
        <Header
            user={{
                username: 'roaiven',
                role: 'web developer'
            }}
            onUserBoxSignOutClick={signOut}
        />
        <div className="b-route-handler">
            {children}
        </div>
        <ModalContainer />
        <NotificationsContainer />
    </div>
);

function mapDispatchToProps(dispatch) {
    return {
        signOut: function () {
            dispatch(signOut())
                .then(action => {
                    if (!action.payload.error) {
                        browserHistory.push('/sign-in');
                    }
                });
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(App);
