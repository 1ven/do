import { assert } from 'chai';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import app from 'server/.';
import { recreateTables } from '../helpers';

describe('boards routes', ()=> {
    beforeEach(recreateTables);

    it('/boards/create should respond with json', (done) => {
        request(app)
        .post('/boards/create')
        .send({title: "test"})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            const body = res.body;
            const expectedBody = {
                success: true,
                data: {
                    id: 1
                }
            };
            assert.deepEqual(body, expectedBody);
            done(err);
        });
    });

    it('/boards/remove should respond with json', (done) => {
        boardsApi.create({title: 'test'})
        .then(() => {
            return request(app)
            .post('/boards/remove')
            .send({id: 1})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                const body = res.body;
                const expectedBody = {
                    "success": true
                };
                assert.deepEqual(body, expectedBody);
                done(err);
            });
        });
    });

    it('/boards/get-all should respond with json', (done)=> {
        request(app)
        .post('/boards/get-all')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            const body = res.body;
            const expectedBody = {
                success: true,
                data: []
            };
            assert.deepEqual(body, expectedBody);
            done(err);
        });
    });
});
