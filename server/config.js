'use strict';

const config = {
  development: {
    db: 'postgres://ivan:123456@localhost:5432/ello',
    port: 3000,
    jwtSecret: 'I am super very secret phrase for jwt',
  },
  test: {
    db: 'postgres://ivan:123456@localhost:5432/ello_test',
    port: 1337,
    jwtSecret: 'I am super very secret phrase for jwt',
  },
  production: {
    db: 'postgres://ivan:123456@localhost:5432/ello',
    port: 8080,
    jwtSecret: 'I am super very secret phrase for jwt',
  },
};

module.exports = config[process.env.NODE_ENV];
