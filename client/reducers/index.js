import { combineReducers } from 'redux';
import boardsReducer from './boardsReducer';
import noticeReducer from './noticeReducer';
import entitiesReducer from './entitiesReducer';

const rootReducer = combineReducers({
    boards: boardsReducer,
    notice: noticeReducer,
    entities: entitiesReducer
});

export default rootReducer;
