import { combineReducers } from 'redux';
import main from './main';
import board from './board';
import trash from './trash';

export default combineReducers({
  main,
  board,
  trash,
});
