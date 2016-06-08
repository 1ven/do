import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entitiesReducer from './entitiesReducer';
import pagesReducer from './pagesReducer';
import editFormReducer from './editFormReducer';
import notificationsReducer from './notificationsReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import progressBarReducer from './progressBarReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  routing: routerReducer,
  pages: pagesReducer,
  editForm: editFormReducer,
  notifications: notificationsReducer,
  user: userReducer,
  search: searchReducer,
  progressBar: progressBarReducer,
});

export default rootReducer;
