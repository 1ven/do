import React from 'react';
import cookie from 'js-cookie';
import Modernizr from 'modernizr';
import { Route, IndexRoute } from 'react-router';
import Sign from './components/Sign';
import UpdateMessage from './components/UpdateMessage';
import AppContainer from './containers/AppContainer';
import IndexPage from './containers/pages/IndexPage';
import BoardPage from './containers/pages/BoardPage';
import SignInPage from './containers/pages/SignInPage';
import SignUpPage from './containers/pages/SignUpPage';
import FullCardModal from './containers/modals/FullCardModal';

const isFlexboxSupported = Modernizr.flexbox && Modernizr.flexwrap;

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

function ensureBrowserIsUpdated(nextState, replace) {
  if (!isFlexboxSupported) {
    replace('/update');
  }
}

function handleUpdatePageEnter(nextState, replace) {
  if (isFlexboxSupported) {
    replace('/');
  }
}

export default function (store) {
  return (
    <Route
      path="/"
    >
      <Route
        onEnter={ensureBrowserIsUpdated}
      >
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
      <Route
        path="update"
        onEnter={handleUpdatePageEnter}
        component={UpdateMessage}
      />
    </Route>
  );
};
