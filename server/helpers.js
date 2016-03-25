const QueryFile = require('pg-promise').QueryFile;

exports.sql = function(file) {
    const path = `./db/tables/${file}`;
    const options = {
        minify: true,
        params: {
            schema: 'public'
        }
    };
    return new QueryFile(path, options);
};
