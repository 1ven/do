import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { thunk, logger, api } from '../middlewares';

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
