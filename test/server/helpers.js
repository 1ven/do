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

export function setup() {
    const data = {
        cards: [{
            id: shortid.generate(),
            text: 'test card 1'
        }, {
            id: shortid.generate(),
            text: 'test card 2'
        }],
        lists: [{
            id: shortid.generate(),
            title: 'test list 1'
        }, {
            id: shortid.generate(),
            title: 'test list 2'
        }],
        boards: [{
            id: shortid.generate(),
            title: 'test board 1'
        }, {
            id: shortid.generate(),
            title: 'test board 2'
        }],
        users: [{
            id: shortid.generate(),
            username: 'test',
            email: 'test@test.com',
            hash: 'hash',
            salt: 'salt'
        }, {
            id: shortid.generate(),
            username: 'test2',
            email: 'test2@test.com',
            hash: 'hash',
            salt: 'salt'
        }]
    };

    const flatData = _.values(data).reduce((acc, entries) => {
        const valuesArr = entries.reduce((acc, entry) => [...acc, ..._.values(entry)], []);
        return [...acc, ...valuesArr];
    }, []);

    return {
        create: () => db.none(`
            INSERT INTO cards (id, text) VALUES ($1, $2), ($3, $4);
            INSERT INTO lists (id, title) VALUES ($5, $6), ($7, $8);
            INSERT INTO boards (id, title) VALUES ($9, $10), ($11, $12);
            INSERT INTO users (id, username, email, hash, salt)
            VALUES ($13, $14, $15, $16, $17), ($18, $19, $20, $21, $22);
        `, flatData),
        data
    };
};
