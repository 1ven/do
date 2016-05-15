const db = require('server/db');

before(() => {
    return db.sequelize.sync();
});

beforeEach(() => {
    return db.sequelize.truncate();
});
