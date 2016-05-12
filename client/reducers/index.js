import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entitiesReducer from './entitiesReducer';
import pagesReducer from './pagesReducer';
import editFormReducer from './editFormReducer';
import modalReducer from './modalReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    routing: routerReducer,
    pages: pagesReducer,
    editForm: editFormReducer,
    modal: modalReducer,
    notifications: notificationsReducer
});

export default rootReducer;
