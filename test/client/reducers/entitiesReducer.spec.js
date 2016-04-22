import { assert } from 'chai';
import entitiesReducer from 'client/reducers/entitiesReducer';
import * as types from 'client/constants/actionTypes';

describe('entities reducer', () => {
    it('should return initial state', () => {
        const nextState = entitiesReducer(undefined, {});
        const expectedState = { boards: {}, lists: {}, cards: {} };

        assert.deepEqual(nextState, expectedState);
    });

    it('should merge entities cache', () => {
        const prevState = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [2] },
                2: { id: 2, title: 'board 2', lists: [1] },
            },
            lists: {
                1: { id: 1, title: 'list 1', cards: null },
                2: { id: 2, title: 'list 2', cards: null }
            },
            cards: {}
        };
        const data = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [2, 5] },
                2: { id: 2, title: 'board 2', lists: [4] },
            },
            lists: {
                5: { id: 5, title: 'list 5', cards: null }
            }
        };
        const expected = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [2, 5] },
                2: { id: 2, title: 'board 2', lists: [4] },
            },
            lists: {
                1: { id: 1, title: 'list 1', cards: null },
                2: { id: 2, title: 'list 2', cards: null },
                5: { id: 5, title: 'list 5', cards: null }
            },
            cards: {}
        }
        const nextState = entitiesReducer(prevState, { payload: { entities: data } });
        assert.deepEqual(nextState, expected);
    });

    it('should handle BOARDS_ADD_LIST_ID', () => {
        const prevState = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [2, 5] }
            },
            lists: {},
            cards: {}
        };
        const nextState = entitiesReducer(prevState, {
            type: types.BOARDS_ADD_LIST_ID,
            payload: {
                boardId: 1,
                listId: 7
            }
        });
        assert.deepEqual(nextState.boards[1].lists, [2, 5, 7]);
    });

    it('should handle BOARDS_REMOVE_LIST_ID', () => {
        const prevState = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [2, 5] }
            },
            lists: {},
            cards: {}
        };
        const nextState = entitiesReducer(prevState, {
            type: types.BOARDS_REMOVE_LIST_ID,
            payload: {
                boardId: 1,
                listId: 2
            }
        });
        const expectedState = {
            boards: {
                1: { id: 1, title: 'board 1', lists: [5] }
            },
            lists: {},
            cards: {}
        };
        assert.deepEqual(nextState, expectedState);
    });

    it('should handle LISTS_ADD_CARD_ID', () => {
        const prevState = {
            boards: {},
            lists: {
                1: { id: 1, title: 'list 1', cards: [4] },
            },
            cards: {}
        };
        const nextState = entitiesReducer(prevState, {
            type: types.LISTS_ADD_CARD_ID,
            payload: {
                listId: 1,
                cardId: 7
            }
        });
        assert.deepEqual(nextState.lists[1].cards, [4, 7]);
    });

    it('should handle LISTS_REMOVE_CARD_ID', () => {
        const prevState = {
            boards: {},
            lists: {
                1: { id: 1, title: 'list 1', cards: [2, 3] },
            },
            cards: {}
        };
        const nextState = entitiesReducer(prevState, {
            type: types.LISTS_REMOVE_CARD_ID,
            payload: {
                listId: 1,
                cardId: 2
            }
        });
        const expectedState = {
            boards: {},
            lists: {
                1: { id: 1, title: 'list 1', cards: [3] },
            },
            cards: {}
        };
        assert.deepEqual(nextState, expectedState);
    });
});
