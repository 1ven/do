'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

module.exports = function(file) {
    const p = path.resolve(__dirname, '../db/tables/', file);
    const options = {
        minify: true
    };
    return new QueryFile(p, options);
};
