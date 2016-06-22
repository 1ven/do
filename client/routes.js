import React from 'react';
import cookie from 'js-cookie';
import { Route, IndexRoute } from 'react-router';
import Sign from './components/Sign';
import AppContainer from './containers/AppContainer';
import IndexPage from './containers/pages/IndexPage';
import BoardPage from './containers/pages/BoardPage';
import TrashPage from './containers/pages/TrashPage';
import SignInPage from './containers/pages/SignInPage';
import SignUpPage from './containers/pages/SignUpPage';
import FullCardModal from './containers/modals/FullCardModal';

function ensureSignedIn(nextState, replace) {
  if (!cookie.get('authenticated')) {
    replace('/sign-in');
  }
}

function ensureSignedOut(nextState, replace) {
  if (cookie.get('authenticated')) {
    replace('/');
  }
}

export default (
  <Route path="/">
    <Route
      onEnter={ensureSignedIn}
      component={AppContainer}
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
      <Route
        path="trash/:pageIndex"
        component={TrashPage}
      >
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
