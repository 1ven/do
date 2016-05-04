import db from 'server/db';
import request from 'supertest';
import sql from 'server/utils/sql';
import path from 'path';
import fs from 'fs';
import app from 'server/.';

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

export function authenticate() {
    const authRequest = request.agent(app);
    const data = {
        username: 'test',
        email: 'test@mail.com',
        password: 123456,
        rePassword: 123456
    };

    return new Promise((resolve, reject) => {
        authRequest
            .post('/sign-up')
            .send(data)
            .end((err, res) => {
                if (err) { reject(err); }
                authRequest
                    .post('/auth/local')
                    .send({
                        username: data.username,
                        password: data.password
                    })
                    .end((err, res) => {
                        if (err) { reject(err); }
                        resolve(authRequest);
                    });
            });
    });
};

