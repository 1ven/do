const db = require('../db');

const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const User = require('../models/User');

List.hasMany(Card);
Board.hasMany(List);
User.hasMany(Board);

module.exports = db;
