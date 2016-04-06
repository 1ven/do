import 'babel-polyfill';
import './stylesheet/common.scss';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router
            routes={routes}
            history={history}
        />
    </Provider>,
    document.getElementById('root')
);
