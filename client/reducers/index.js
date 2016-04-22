import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import noticeReducer from './noticeReducer';
import entitiesReducer from './entitiesReducer';
import pagesReducer from './pagesReducer';
import editFormReducer from './editFormReducer';

const rootReducer = combineReducers({
    notice: noticeReducer,
    entities: entitiesReducer,
    routing: routerReducer,
    pages: pagesReducer,
    editForm: editFormReducer
});

export default rootReducer;
