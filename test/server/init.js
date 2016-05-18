import db from 'server/models';
import Promise from 'bluebird';
import _ from 'lodash';

beforeEach(() => {
    return db.drop().then(() => db.sync());
});
