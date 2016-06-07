'use strict';

const path = require('path');
const fs = require('fs');

module.exports = (file) => {
  const p = path.resolve(__dirname, '../db/tables/', file);
  return fs.readFileSync(p, 'utf8');
};
