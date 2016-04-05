// import { Schema } from 'normalizr';
// import nock from 'nock';
// import configureMockStore from 'redux-mock-store';
// import apiMiddleware, { CALL_API } from 'client/middlewares/api';

// const middlewares = [ apiMiddleware ];
// const mockStore = configureMockStore(middlewares);

// const types = {
//     REQUEST: 'REQUEST',
//     SUCCESS: 'SUCCESS',
//     ERROR: 'ERROR'
// };
// const apiAction = {
//     [CALL_API]: {
//         types: [
//             types.REQUEST,
//             types.SUCCESS,
//             types.ERROR
//         ],
//         endpoint: '/test',
//     }
// };

// describe('apiMiddleware', () => {
//     beforeEach(() => {
//         nock.cleanAll();
//     });

//     it('should call request to api', (done) => {
//         const store = mockStore();

//         nock('http://localhost')
//             .get('/test')
//             .reply(200);

//         store.dispatch(apiAction);
//     });
// });
