import db from 'server/db';
import sql from 'server/utils/sql';
import path from 'path';
import fs from 'fs';

const sessionSql = fs.readFileSync(path.resolve(__dirname, '../../node_modules/connect-pg-simple/table.sql'), 'utf8');

export function recreateTables() {
    return db.tx(function() {
        return this.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public')
            .then(() => this.query(sessionSql))
            .then(() => this.query(sql('cards.sql')))
            .then(() => this.query(sql('lists.sql')))
            .then(() => this.query(sql('boards.sql')))
            .then(() => this.query(sql('users.sql')))
    });
};
