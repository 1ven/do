const env = process.env.NODE_ENV;

module.exports = {
    db: {
        host: 'localhost',
        port: '5432',
        database: env !== 'test' ? 'ello' : 'ello_test',
        user: 'ivan'
    }
};
