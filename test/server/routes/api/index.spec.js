import { assert } from 'chai';
import request from 'supertest';
import app from 'server/index';

describe('api routes', () => {
  it('should return {} when unauthenticated user trying to access /api', (done) => {
    request(app)
    .get('/api/boards')
    .end((err, res) => {
      if (err) { return done(err); }

      assert.deepEqual(res.body, {});

      done();
    });
  });
});
