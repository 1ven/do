import { assert } from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import sinon from 'sinon';
import UserController from 'server/controllers/UserController';

const Model = {
    register(props) {
        if (_.isPlainObject(props)) {
            delete props.password;
            delete props.rePassword;

            return Promise.resolve(props);
        }
        return Promise.reject(new Error('test error'));
    }
};

const initialModel = UserController.Model;

describe('UserController', () => {
    before(() => {
        UserController.Model = Model;
    });

    after(() => {
        UserController.Model = initialModel;
    });

    const body = {
        username: 'johnnnnnny',
        password: 123456,
        rePassword: 123456,
        email: 'test@mail.com'
    };
    describe('register', () => {
        it('should respond with status 201', () => {
            const spy = sinon.spy();
            const req = {
                body
            };
            const res = {
                status(code) {
                    spy(code);
                    return { json: function() {} };
                }
            };
            return UserController.register(req, res)
                .then(() => {
                    assert(spy.calledWith(201));
                });
        });

        it('should return result, returned from model', () => {
            const spy = sinon.spy();
            const req = {
                body
            };
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return UserController.register(req, res)
                .then(() => {
                    const result = {
                        username: req.body.username,
                        email: req.body.email
                    };
                    assert(spy.calledWith({ result }));
                });
        });
    });
});
