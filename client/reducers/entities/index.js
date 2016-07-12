import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import boards from './boards';
import lists from './lists';
import cards from './cards';

export function entity(type) {
  return function(state = {}, action) {
    const payload = action.payload;

    if (payload && payload.entities) {
      return merge({}, state, payload.entities[type]);
    }

    return state;
  };
}

export default combineReducers({
  boards,
  lists,
  cards,
  users: entity('users'),
  comments: entity('comments'),
  activity: entity('activity'),
});
