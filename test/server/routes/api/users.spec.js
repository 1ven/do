import { assert } from 'chai';
import _ from 'lodash';
import request from 'supertest';
import app from 'server/index';
import { recreateTables, authenticate } from '../../helpers';

describe('users routes', () => {
    beforeEach(recreateTables);

    it('POST /api/users should respond with 201 and return created user', (done) => {
        request(app)
            .post('/api/users')
            .expect(201)
            .send({
                username: 'testuser',
                email: 'test@test.com',
                password: '123456',
                confirmation: '123456'
            })
            .end((err, res) => {
                if (err) { return done(err); }

                const user = res.body.result;

                assert.property(user, 'id');

                assert.deepEqual(_.omit(user, ['id']), {
                    username: 'testuser'
                });

                done();
            });
    });
});
