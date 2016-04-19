import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import noticeReducer from './noticeReducer';
import entitiesReducer from './entitiesReducer';
import pagesReducer from './pagesReducer';

const rootReducer = combineReducers({
    notice: noticeReducer,
    entities: entitiesReducer,
    routing: routerReducer,
    pages: pagesReducer
});

export default rootReducer;
