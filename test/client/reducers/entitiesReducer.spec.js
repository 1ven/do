import { assert } from 'chai';
import entitiesReducer from 'client/reducers/entitiesReducer';

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
});
