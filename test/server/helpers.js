import request from 'supertest';
import _ from 'lodash';
import Promise from 'bluebird';
import app from 'server/.';
import db from 'server/db';
import sql from 'server/utils/sql';

export function recreateTables() {
  return db.tx(function () {
      return this.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public')
        .then(() => this.query(sql('activity.sql')))
        .then(() => this.query(sql('comments.sql')))
        .then(() => this.query(sql('cards.sql')))
        .then(() => this.query(sql('lists.sql')))
        .then(() => this.query(sql('boards.sql')))
        .then(() => this.query(sql('users.sql')))
        .then(() => this.query(sql('views.sql')));
  });
};

export function authenticate() {
  const authRequest = request.agent(app);
  const data = {
    username: 'test',
    email: 'test@mail.com',
    password: 123456,
    confirmation: 123456,
  };

  return new Promise((resolve, reject) => {
    authRequest
    .post('/sign-up')
    .send(data)
    .end((err, res) => {
      if (err) { reject(err); }
      resolve(authRequest);
    });
  });
}

export function getValidationMessages(err) {
  return _.reduce(err.validation, (acc, item) => {
    return [...acc, item.message];
  }, []);
}
