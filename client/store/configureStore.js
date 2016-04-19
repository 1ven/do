import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { thunk, logger, api } from '../middlewares';

// TODO: disable thunk middleware
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            api,
            thunk,
            logger
        )
    );
};
