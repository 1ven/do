import { assert } from 'chai';
import request from 'supertest';
import { recreateTables } from '../helpers';
import app from 'server/.';

describe('/sign-up routes', () => {
    beforeEach(recreateTables);

    it('POST /sign-up should respond with 201 and return created user data', (done) => {
        request(app)
            .post('/sign-up')
            .send({
                username: 'test',
                email: 'test@mail.com',
                password: 123456,
                rePassword: 123456
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) { return done(err); }

                assert.deepEqual(res.body, {
                    result: {
                        id: 1,
                        username: 'test'
                    }
                });

                done();
            });
    });
});
