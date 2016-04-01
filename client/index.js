import 'babel-polyfill';
import './stylesheet/common.scss';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './components/App';
// import { getBoards } from './actions/boardsActions';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
