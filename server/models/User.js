const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const User = {
    createBoard(userId, boardData) {
        const id = shortid.generate();

        return db.one(`INSERT INTO boards (id, title) VALUES ($1, $2) RETURNING id, title`,
        [id, boardData.title])
            .then(board => {
                return db.none(`INSERT INTO users_boards VALUES ($1, $2)`, [userId, board.id])
                    .then(() => board);
            });
    }
};

module.exports = User;
