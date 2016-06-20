import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import pages from './pages';
import notifications from './notifications';
import user from './user';
import search from './search';
import progressBar from './progressBar';

const rootReducer = combineReducers({
  entities,
  routing,
  pages,
  notifications,
  user,
  search,
  progressBar,
});

export default rootReducer;
