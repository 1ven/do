import merge from 'lodash/merge';
import boards from './boards';
import lists from './lists';
import cards from './cards';

export default function entities(state = {}, action) {
  const payload = action.payload;

  if (payload && payload.entities) {
    return merge({}, state, payload.entities);
  }

  return {
    boards: boards(state.boards, action),
    lists: lists(state.lists, action),
    cards: cards(state.cards, action),
    users: state.users || {},
    comments: state.comments || {},
    activity: state.activity || {},
    trash: state.trash || {},
  };
}
