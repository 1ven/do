import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Sign from './components/Sign';
import IndexPage from './containers/IndexPage';
import BoardPage from './containers/BoardPage';
import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';

const isAuthenticated = true;

export default (
    <Route path="/">
        <Route
            onEnter={ensureLoggedIn}
            component={App}
        >
            <IndexRoute
                component={IndexPage}
            />
            <Route
                path="boards/:id"
                component={BoardPage}
            />
        </Route>
        <Route
            onEnter={ensureLoggedOut}
            component={Sign}
        >
            <Route
                path="sign-in"
                component={SignInPage}
            />
            <Route
                path="sign-up"
                component={SignUpPage}
            />
        </Route>
    </Route>
);

function ensureLoggedIn(nextState, replace) {
    if (!isAuthenticated) {
        replace('/sign-in');
    }
};

function ensureLoggedOut(nextState, replace) {
    if (isAuthenticated) {
        replace('/');
    }
};
