'use strict';

const env = process.env.NODE_ENV;

module.exports = {
    db: {
        host: 'localhost',
        port: '5432',
        database: env !== 'test' ? 'ello' : 'ello_test',
        user: 'ivan'
    },
    bundle: env === 'production' ? '/public/bundle.js' : 'http://localhost:8080/bundle.js',
    port: env !== 'test' ? 3000 : 1337
};
