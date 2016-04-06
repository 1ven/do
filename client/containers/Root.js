import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import NoticeContainer from './NoticeContainer';

class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router
                        routes={routes}
                        history={history}
                    />
                    <NoticeContainer /> 
                </div>
            </Provider>
        );
    }
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;
