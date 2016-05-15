const db = require('../db');

const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');

Board.hasMany(List);
List.hasMany(Card);

module.exports = db;
