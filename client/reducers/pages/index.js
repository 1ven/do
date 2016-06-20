import { combineReducers } from 'redux';
import main from './main';
import board from './board';
import trash from './trash';
import signUp from './signUp';
import signIn from './signIn';

export default combineReducers({
  main,
  board,
  trash,
  signUp,
  signIn,
});
