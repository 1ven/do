module.exports = function (config) {
    return `pg://${config.user}:${config.password}@${config.host}/${config.database}`;
};
