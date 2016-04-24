import { assert } from 'chai';
import errorHandler from 'server/middlewares/errorHandler';
import sinon from 'sinon';

describe('errorHandler', () => {
    it('should not return error message when NODE_ENV is `production`', () => {
        const initialEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        const spy = sinon.spy();
        const res = {
            status: () => {
                return { json: spy };
            }
        };
        errorHandler('test error', null, res);

        process.env.NODE_ENV = initialEnv;

        assert(spy.calledWith({ message: undefined }));
    });

    it('should return status 500 by default', () => {
        const spy = sinon.spy();
        const err = new Error('test error');
        const res = {
            status: (code) => {
                spy(code);
                return { json: function() {} };
            }
        };
        errorHandler(err, null, res);
        assert(spy.calledWith(500));
    });

    it('should call `next` function with error when headers was sent', () => {
        const spy = sinon.spy();
        const err = new Error('test error');
        const res = {
            headersSent: true,
            status: () => {
                return { json: function() {} };
            }
        };
        errorHandler(err, null, res, spy);
        assert(spy.calledWith(err));
    });

    it('should return status 404 when error code is 0', () => {
        const spy = sinon.spy();
        const err = new Error('test error');
        const res = {
            status: (code) => {
                spy(code);
                return { json: function() {} };
            }
        };
        err.code = 0;
        errorHandler(err, null, res);
        assert(spy.calledWith(404));
    });

    it('should return error message in json in all environments except production', () => {
        const spy = sinon.spy();
        const spy2 = sinon.spy();
        const err = new Error('test error');

        errorHandler(err, null, {
            status: () => {
                return { json: spy };
            }
        });
        assert(spy.calledWith({ message: 'test error' }));
        errorHandler('another error', null, {
            status: () => {
                return { json: spy2 };
            }
        });
        assert(spy2.calledWith({ message: 'another error' }));
    });
});
