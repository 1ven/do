import { createStore } from 'redux'
import rootReducer from './reducers';
import { getBoards } from './actions/boardsActions';

const store = createStore(rootReducer);

store.subscribe(() => {
    console.log(store.getStore());
});

store.dispatch(getBoards());
