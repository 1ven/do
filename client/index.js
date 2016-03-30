import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getBoards } from './actions/boardsActions';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(getBoards());
