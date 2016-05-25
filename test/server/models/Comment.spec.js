import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Comment from 'server/models/Comment';

const commentId = shortid.generate();
const comment2Id = shortid.generate();
const cardId = shortid.generate();
const userId = shortid.generate();

/* describe('Comment', () => { */
/*     beforeEach(() => recreateTables().then(setup)); */
/* }); */

function setup() {
    return db.none(`
        INSERT INTO users (id, username, email, hash, salt)
            VALUES ($1, 'testuser', 'testuser@test.com', 'hash', 'salt');
        INSERT INTO cards (id, text) VALUES ($2, 'test card');
        INSERT INTO comments (id, text) VALUES ($3, 'test comment 1');
        INSERT INTO comments (id, text) VALUES ($4, 'test comment 2');
        INSERT INTO cards_comments VALUES ($2, $3);
        INSERT INTO cards_comments VALUES ($2, $4);
        INSERT INTO users_comments VALUES ($1, $3);
        INSERT INTO users_comments VALUES ($1, $4);
    `, [userId, cardId, commentId, comment2Id]);
};
