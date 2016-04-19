import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import IndexPage from './containers/IndexPage';
import BoardPage from './containers/BoardPage';

export default (
    <Route
        path="/"
        component={App}
    >
        <IndexRoute
            component={IndexPage}
        />
        <Route
            path="/boards/:id"
            component={BoardPage}
        />
    </Route>
);
