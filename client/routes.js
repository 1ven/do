import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Sign from './components/Sign';
import IndexPage from './containers/IndexPage';
import BoardPage from './containers/BoardPage';
import SignInPage from './containers/SignInPage';

export default (
    <Route path="/">
        <Route component={App}>
            <IndexRoute
                component={IndexPage}
            />
            <Route
                path="boards/:id"
                component={BoardPage}
            />
        </Route>
        <Route component={Sign}>
            <Route
                path="sign-in"
                component={SignInPage}
            />
        </Route>
    </Route>
);
