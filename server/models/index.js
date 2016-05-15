const db = require('../db');

const List = require('../models/List');
const Card = require('../models/Card');

List.hasMany(Card);

module.exports = db;
