import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import DevTools from './DevTools';

const env = process.env.NODE_ENV;

class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                {
                    env === 'production' ? (
                        <Router routes={routes} history={history} />
                    ) : (
                        <div>
                            <Router routes={routes} history={history} />
                            <DevTools />
                        </div>
                    )
                }
            </Provider>
        );
    }
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;
