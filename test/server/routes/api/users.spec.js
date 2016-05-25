import _ from 'lodash';
import { assert } from 'chai';
import { authenticate, recreateTables } from '../../helpers';

describe('users routes', () => {
    it('GET /api/user should respond with 200 and return user data', (done) => {
        recreateTables().then(authenticate)
            .then(request => {
                request
                    .get('/api/user')
                    .expect(200)
                    .end((err, res) => {
                        if (err) { return done(err); }

                        const user = res.body.result;

                        assert.property(user, 'id');
                        assert.deepEqual(_.omit(user, ['id']), {
                            username: 'test'
                        });

                        done();
                    });
            });
    });
});
