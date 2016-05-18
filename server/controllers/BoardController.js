const List = require('../models/List');
const Board = require('../models/Board');

exports.create = function (req, res) {
    const boardData = req.body;
    Board.create(boardData)
        .then(board => {
            return Board.findById(board.id);
        })
        .then(board => {
            const result = board.toJSON();
            res.status(201).send({ result });
        });
};

exports.findAll = function (req, res) {
    Board.findAll().then(boards => {
        const result = boards.map(board => board.toJSON());
        res.status(200).send({ result });
    });
};

exports.findById = function (req, res) {
    const id = req.params.id;
    Board.findById(id).then(board => {
        const result = board.toJSON();
        res.status(200).send({ result });
    });
};

exports.update = function (req, res) {
    const boardData = req.body;
    const boardId = req.params.id;
    // TODO: check user input data
    // Instead of using fields property, to set allowed to update fields, use ssacl
    Board.update(boardData, { where: { id: boardId } })
        // FIXME: the same as in create
        .then(board => {
            return Board.findById(boardId);
        })
        .then(board => {
            const result = board.toJSON();
            res.status(200).send({ result });
        });
};

exports.delete = function (req, res) {
    const boardId = req.params.id;
    Board.drop({ where: { id: boardId } })
        .then(() => {
            res.status(200).send({ result: { id: boardId } });
        });
};

exports.createList = function (req, res) {
    const boardId = req.params.id;
    const listData = req.body;

    Board.findById(boardId)
        .then(board => {
            return board.createList(listData);
        })
        .then(list => {
            return List.findById(list.id);
        })
        .then(list => {
            const result = list.toJSON();
            res.status(201).send({ result });
        });
};
