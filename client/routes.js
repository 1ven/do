import React, { PropTypes } from 'react';
import cookie from 'js-cookie';
import { Route, IndexRoute } from 'react-router';
import Sign from './components/Sign';
import App from './components/App';
import IndexPage from './containers/IndexPage';
import BoardPage from './containers/BoardPage';
import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';
import FullCardModal from './containers/FullCardModal';

export default (
    <Route path="/">
        <Route
            onEnter={ensureSignedIn}
            component={App}
        >
            <IndexRoute
                component={IndexPage}
            />
            <Route
                path="boards/:boardId"
                component={BoardPage}
            >
                <Route
                    path="cards/:cardId"
                    component={FullCardModal}
                />
            </Route>
        </Route>
        <Route
            onEnter={ensureSignedOut}
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

function ensureSignedIn(nextState, replace) {
    if (!cookie.get('authenticated')) {
        replace('/sign-in');
    }
};

function ensureSignedOut(nextState, replace) {
    if (cookie.get('authenticated')) {
        replace('/');
    }
};
