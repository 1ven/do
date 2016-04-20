import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { thunk, logger, api } from '../middlewares';
import DevTools from '../containers/DevTools';

const enhancer = compose(
    applyMiddleware(
        api,
        thunk,
        logger
    ),
    DevTools.instrument()
);

// TODO: disable thunk middleware
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
};
