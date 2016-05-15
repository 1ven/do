const db = require('server/models');

before(() => {
    return db.sync();
});

beforeEach(() => {
    return db.truncate();
});
