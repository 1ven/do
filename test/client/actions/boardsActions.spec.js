// import { assert } from 'chai';
// import * as boardsActions from 'client/actions/boardsActions';
// import { BOARDS } from 'client/constants/actionTypes';

// describe('boards actions', () => {
//     it('should create an action to create board', () => {
//         const action = boardsActions.create(5, 'test title');
//         const expectedAction = {
//             type: BOARDS.CREATE,
//             payload: {
//                 id: 5,
//                 title: 'test title'
//             }
//         };
//         assert.deepEqual(action, expectedAction);
//     });

//     it('should create an action to remove board', () => {
//         const action = boardsActions.remove(5);
//         const expectedAction = {
//             type: BOARDS.REMOVE,
//             payload: {
//                 id: 5
//             }
//         };
//         assert.deepEqual(action, expectedAction);
//     });
// });
