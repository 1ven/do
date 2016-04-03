import { combineReducers } from 'redux';
import boardsReducer from './boardsReducer';
import noticeReducer from './noticeReducer';

const rootReducer = combineReducers({
    boards: boardsReducer,
    notice: noticeReducer
});

export default rootReducer;
