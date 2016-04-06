import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import BoardsListContainer from './containers/BoardsListContainer';
import FullBoardContainer from './containers/FullBoardContainer';

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
            component={FullBoardContainer}
        />
    </Route>
);
