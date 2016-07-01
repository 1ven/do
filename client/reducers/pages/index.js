import { combineReducers } from 'redux';
import main from './main';
import board from './board';

export default combineReducers({
  main,
  board,
});
