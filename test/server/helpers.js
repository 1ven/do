import request from 'supertest';
import shortid from 'shortid';
import _ from 'lodash';
import Promise from 'bluebird';
import app from 'server/.';
import db from 'server/db';
import sql from 'server/utils/sql';

export function recreateTables() {
    return db.tx(function() {
        return this.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public')
            .then(() => this.query(sql('cards.sql')))
            .then(() => this.query(sql('lists.sql')))
            .then(() => this.query(sql('boards.sql')))
            .then(() => this.query(sql('users.sql')))
    });
};

export function authenticate() {
    // authentication is not implemented yet
    const authRequest = request.agent(app);

    return new Promise((resolve, reject) => {
        resolve(authRequest);
    });
};
