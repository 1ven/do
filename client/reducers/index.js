import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import noticeReducer from './noticeReducer';
import entitiesReducer from './entitiesReducer';
import pagesReducer from './pagesReducer';
import editFormReducer from './editFormReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    notice: noticeReducer,
    entities: entitiesReducer,
    routing: routerReducer,
    pages: pagesReducer,
    editForm: editFormReducer,
    modal: modalReducer
});

export default rootReducer;
