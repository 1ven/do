import { combineReducers } from 'redux';
import boardsReducer from './boardsReducer';

const rootReducer = combineReducers({
    boards: boardsReducer
});

export default rootReducer;
