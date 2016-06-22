import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import pages from './pages';
import notifications from './notifications';
import user from './user';
import search from './search';
import progressBar from './progressBar';
import activity from './activity';
import modal from './modalReducer';

const rootReducer = combineReducers({
  entities,
  routing,
  pages,
  notifications,
  user,
  search,
  progressBar,
  activity,
  modal,
});

export default rootReducer;
