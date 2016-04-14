import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import BoardsListContainer from './containers/BoardsListContainer';
import BoardContainer from './containers/BoardContainer';

export default (
    <Route
        path="/"
        component={App}
    >
        <IndexRoute
            component={BoardsListContainer}
        />
        <Route
            path="/boards/:id"
            component={BoardContainer}
        />
    </Route>
);
