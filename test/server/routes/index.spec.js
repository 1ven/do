import { assert } from 'chai';
import _ from 'lodash';
import request from 'supertest';
import app from 'server/index';
import db from 'server/db';
import { recreateTables } from '../helpers';

describe('index routes', () => {
    beforeEach(recreateTables);

    it('POST /api/users should create user, authenticate it, and return json - { redirectTo: "/" }', (done) => {
        request(app)
            .post('/sign-up')
            .send({
                username: 'testuser',
                email: 'test@test.com',
                password: '123456',
                confirmation: '123456'
            })
            .end((err, res) => {
                if (err) { return done(err); }

                db.result('SELECT id FROM users WHERE username = $1', ['testuser'])
                    .then(result => {
                        const cookies = res.header['set-cookie'];

                        assert.equal(result.rowCount, 1);
                        assert.deepEqual(res.body, {
                            redirectTo: '/'
                        });

                        assert.lengthOf(cookies.filter(c => {
                            return !! (
                                c.match(/access_token/i) &&
                                c.match(new RegExp(`max-age=${30 * 24 * 60 * 60}`, 'i')) &&
                                c.match(/httponly/i)
                            );
                        }), 1);

                        assert.lengthOf(cookies.filter(c => {
                            return !! (
                                c.match(/authenticated=true/i) &&
                                c.match(new RegExp(`max-age=${30 * 24 * 60 * 60}`, 'i'))
                            );
                        }), 1);

                        done();
                    }, done);
            });
    });
});
