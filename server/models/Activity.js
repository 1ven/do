const db = require('../db');

const Activity = {
    create(entryId, entryTable, action) {
        return db.one(`
            INSERT INTO activity(entry_id, entry_table, action)
            VALUES ($1, $2, $3)
            RETURNING id, created_at, entry_id, entry_table, action
        `, [entryId, entryTable, action]);
    }
};

module.exports = Activity;
