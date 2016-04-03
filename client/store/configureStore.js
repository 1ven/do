import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { thunk, logger } from '../middlewares';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            logger
        )
    );
};
