// import { assert } from 'chai';
// import nock from 'nock';
// import configureMockStore from 'redux-mock-store';
// import * as types from 'client/constants/actionTypes';
// import * as actions from 'client/actions/boardsActions';
// import { headers } from 'client/constants/config';
// import apiMiddleware from 'client/middlewares/api';

// const middlewares = [ apiMiddleware ];
// const mockStore = configureMockStore(middlewares);

// describe('boardsActions', () => {
//     beforeEach(() => {
//         nock.cleanAll();
//     });

//     describe('getBoards', () => {
//         it('should dispatch BOARDS_GET_SUCCESS action when getting boards has been done', () => {
//             const boards = 'boards payload';
//             const expectedActions = [
//                 { type: types.BOARDS_GET_REQUEST },
//                 { type: types.BOARDS_GET_SUCCESS, payload: boards }
//             ];
//             const store = mockStore();

//             nock('http://localhost', { reqheaders:  headers })
//                 .post('/boards/get-all')
//                 .reply(200, { success: true, data: boards });

//             return store.dispatch(actions.getBoards())
//                 .then(() => {
//                     assert.deepEqual(store.getActions(), expectedActions);
//                 });
//         });

//         it('should dispatch BOARDS_GET_ERROR when getting boards has been done with error', () => {
//             const errorMessage = 'Test error message';
//             const expectedActions = [
//                 { type: types.BOARDS_GET_REQUEST },
//                 { type: types.BOARDS_GET_ERROR, payload: new Error(errorMessage), error: true },
//             ];
//             const store = mockStore();

//             nock('http://localhost', { reqheaders:  headers })
//                 .post('/boards/get-all')
//                 .reply(200, { success: false, error: errorMessage });

//             return store.dispatch(actions.getBoards())
//                 .then(() => {
//                     const actions = store.getActions();
//                     const err = actions[1].payload;

//                     assert.deepEqual(actions, expectedActions);
//                     assert.equal(err.message, errorMessage);
//                 });
//         });
//     });

//     describe('createBoard', () => {
//         it('should dispatch BOARDS_CREATE_SUCCESS, when board created successfully', () => {
//             const board = {
//                 id: 4,
//                 title: 'test board'
//             };
//             const expectedActions = [
//                 { type: types.BOARDS_CREATE_SUCCESS, payload: board }
//             ];
//             const store = mockStore();

//             nock('http://localhost', { reqheaders:  headers })
//                 .post('/boards/create', {
//                     title: board.title
//                 })
//                 .reply(200, { success: true, data: board });

//             return store.dispatch(actions.createBoard(board.title))
//                 .then(() => {
//                     assert.deepEqual(store.getActions(), expectedActions);
//                 });
//         });
//     });
// });
