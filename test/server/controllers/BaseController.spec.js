import { assert } from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import sinon from 'sinon';
import BaseController from 'server/controllers/BaseController';

const Model = {
    create(props) {
        if (_.isPlainObject(props)) {
            return Promise.resolve(props);
        }
        return Promise.reject('test error');
    },
    remove(id) {
        if (_.isNaN(id)) {
            return Promise.reject('test error');
        }

        return Promise.resolve({ id });
    },
    getWithChildren(props) {
        if (props && _.isNaN(props.id)) {
            return Promise.reject('test error');
        }

        return Promise.resolve([{ title: 'test entry' }]);
    },
    getWithChildrenOne(props) {
        return this.getWithChildren(props)
            .then(entries => entries[0]);

    },
    update(id, props) {
        if (_.isNaN(id)) {
            return Promise.reject('test error');
        }

        return Promise.resolve(_.assign({}, {
            id,
            title: 'entry title'
        }, props));
    }
};
const TestController = _.assign({}, BaseController, { Model });

describe('BaseController', () => {
    describe('create entry', () => {
        it('should respond with status 201', () => {
            const spy = sinon.spy();
            const req = {
                body: { title: 'test' }
            };
            const res = {
                status(code) {
                    spy(code);
                    return { json: function() {} };
                }
            };
            return TestController.create(req, res)
                .then(() => {
                    assert(spy.calledWith(201));
                });
        });

        it('should return created entry', () => {
            const spy = sinon.spy();
            const req = {
                body: { title: 'test' }
            };
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return TestController.create(req, res)
                .then(() => {
                    assert(spy.calledWith({ result: req.body }));
                });
        });

        it('should call `next` function with error, if promise was rejected', () => {
            const spy = sinon.spy();
            return TestController.create({}, {}, spy)
                .then(() => {
                    assert(spy.calledWith('test error'));
                });
        });
    });

    describe('get', () => {
        it('should return all entries', () => {
            const spy = sinon.spy();
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return TestController.get({}, res)
                .then(() => {
                    assert(spy.calledWith({ result: [{ title: 'test entry' }] }));
                });
        });
    });

    describe('getOne', () => {
        it('should return entry by given id', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: 3 }
            };
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return TestController.getOne(req, res)
                .then(() => {
                    assert(spy.calledWith({ result: { title: 'test entry' } }));
                });
        });

        it('should respond with status 200', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: 3 }
            };
            const res = {
                status(code) {
                    spy(code);
                    return { json: function() {} };
                }
            };
            return TestController.getOne(req, res)
                .then(() => {
                    assert(spy.calledWith(200));
                });
        });

        it('should call `next` function with error, if promise was rejected', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: 'wrong id' }
            };

            return TestController.getOne(req, {}, spy)
                .then(() => {
                    assert(spy.calledWith('test error'));
                });
        });
    });

    describe('remove', () => {
        it('should respond with status 200', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: 5 }
            };
            const res = {
                status(code) {
                    spy(code);
                    return { json: function() {} };
                }
            };
            return TestController.remove(req, res)
                .then(() => {
                    assert(spy.calledWith(200));
                });
        });

        it('should call `next` function with error, if promise was rejected', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: false }
            };

            return TestController.remove(req, {}, spy)
                .then(() => {
                    assert(spy.calledWith('test error'));
                });
        });

        it('should return removed id', () => {
            const spy = sinon.spy();
            const req = {
                params: { id: 3 }
            };
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return TestController.remove(req, res)
                .then(() => {
                    assert(spy.calledWith({ result: { id: 3 } }));
                });
        });
    });

    describe('update', () => {
        it('should respond with status 200', () => {
            const spy = sinon.spy();
            const req = {
                params: {
                    id: 2
                },
                body: {
                    title: 'new title'
                }
            };
            const res = {
                status(code) {
                    spy(code);
                    return { json: function() {} };
                }
            };
            return TestController.update(req, res)
                .then(() => {
                    assert(spy.calledWith(200));
                });
        });

        it('should return updated entry', () => {
            const spy = sinon.spy();
            const req = {
                params: {
                    id: 2
                },
                body: {
                    title: 'new title'
                }
            };
            const res = {
                status() {
                    return { json: spy };
                }
            };
            return TestController.update(req, res)
                .then(() => {
                    assert(spy.calledWith({
                        result: {
                            id: 2,
                            title: 'new title'
                        }
                    }));
                });
        });
    });
});
