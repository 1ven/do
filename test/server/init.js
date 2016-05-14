const db = require('server/db');

before(() => {
    db.sequelize.sync();
});
