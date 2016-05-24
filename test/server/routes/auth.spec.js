import { assert } from 'chai';
import _ from 'lodash';
import request from 'supertest';
import app from 'server/index';
import db from 'server/db';
import { recreateTables, authenticate } from '../helpers';
import User from 'server/models/User';

describe('auth routes', () => {
    beforeEach(recreateTables);

    it('POST /auth/sign-in/local authenticate user, and return json - {}', (done) => {
        User.create({
            username: 'testuser',
            email: 'testuser@mail.com',
            password: '123456',
            confirmation: '123456'
        }).then(() => {
            request(app)
                .post('/auth/sign-in/local')
                .send({
                    username: 'testuser',
                    password: '123456',
                    remember: 'on'
                })
                .end((err, res) => {
                    if (err) { return done(err); }

                    const cookies = res.header['set-cookie'];

                    assert.deepEqual(res.body, {});

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
                });
        });
    });

    it('POST /auth/sign-in/local should respond with 400 and return validation error, when password is incorrect', (done) => {
        User.create({
            username: 'testuser',
            email: 'testuser@mail.com',
            password: '123456',
            confirmation: '123456'
        }).then(() => {
            request(app)
                .post('/auth/sign-in/local')
                .send({
                    username: 'testuser',
                    password: '1234567'
                })
                .expect(400)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: [{
                            name: 'password',
                            message: 'Incorrect password'
                        }]
                    });

                    done();
                });
        });
    });

    it('POST /auth/sign-in/local should respond with 400 and return validation error, when user does not exist', (done) => {
        request(app)
            .post('/auth/sign-in/local')
            .send({
                username: 'testuser',
                password: '123456'
            })
            .expect(400)
            .end((err, res) => {
                if (err) { return done(err); }

                assert.deepEqual(res.body, {
                    result: [{
                        name: 'username',
                        message: 'Incorrect username'
                    }]
                });

                done();
            });
    });

    it('POST /auth/sign-out should unauthenticate user and return {}', (done) => {
        authenticate().then(request => {
            request
                .post('/auth/sign-out')
                .end((err, res) => {
                    if (err) { return done(err); }

                    const cookies = res.header['set-cookie'];

                    assert.deepEqual(res.body, {});

                    assert.lengthOf(cookies.filter(c => {
                        return !! c.match(/access_token=;/i);
                    }), 1);

                    assert.lengthOf(cookies.filter(c => {
                        return !! c.match(/authenticated=;/i);
                    }), 1);

                    done();
                });
        });
    });
});
