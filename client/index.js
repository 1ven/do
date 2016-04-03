import 'babel-polyfill';
import './stylesheet/common.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
