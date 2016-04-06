import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import BoardsListContainer from 'containers/BoardsListContainer';
import FullBoardContainer from 'containers/FullBoardContainer';

export default (
    <Route
        path="/"
        component={BoardsListContainer}
    >
        <Route
            path="/boards/:id"
            component={FullBoardContainer}
        />
    </Route>
);
