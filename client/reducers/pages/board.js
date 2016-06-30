import types from '../../constants/actionTypes';

function card(state = {
  isFetching: false,
  lastUpdated: undefined,
  error: false,
}, action) {
  switch (action.type) {
    case types.CARD_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.CARD_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
        error: false,
      };
    case types.CARD_FETCH_FAILURE:
      return {
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

function board(state = {
  card: undefined,
  isFetching: false,
  lastUpdated: undefined,
  error: false,
}, action) {
  switch (action.type) {
    case types.BOARD_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.BOARD_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
        error: false,
      };
    case types.BOARD_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case types.CARD_FETCH_REQUEST:
    case types.CARD_FETCH_SUCCESS:
    case types.CARD_FETCH_FAILURE:
      return {
        ...state,
        card: card(state.card, action),
      };
    default:
      return state;
  }
}

export default function boards(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.BOARD_FETCH_REQUEST:
      return {
        ...state,
        [payload.id]: board(state[payload.id], action),
      };
    case types.BOARD_FETCH_SUCCESS:
    case types.BOARD_FETCH_FAILURE:
      return {
        ...state,
        [payload.result]: board(state[payload.result], action),
      };
    case types.CARD_FETCH_REQUEST:
      return {
        ...state,
        [payload.boardId]: board(state[payload.boardId], action),
      };
    case types.CARD_FETCH_SUCCESS:
    case types.CARD_FETCH_FAILURE:
      return {
        ...state,
        [payload.request.boardId]: board(state[payload.request.boardId], action),
      };
    default:
      return state;
  }
}
