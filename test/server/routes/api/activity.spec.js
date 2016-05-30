import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const listId = shortid.generate();
const cardId = shortid.generate();

describe('activity routes', () => {
    beforeEach(recreateTables);

    it('GET /api/activity should respond with 200 and return last 15 activity', (done) => {
        setup().then(request => {
            request
                .get(`/api/activity`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const activity = res.body.result;

                    assert.lengthOf(activity, 15);
                    assert.property(activity[0], 'created_at');
                    assert.deepEqual(_.omit(activity[0], ['created_at']), {
                        id: 1,
                        action: 'Created',
                        type: 'card',
                        entry: {
                            title: 'test card',
                            link: `/boards/${boardId}/cards/${cardId}`
                        }
                    });

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return authenticate().then(request => {
        return db.none(`
            INSERT INTO boards (id, title) VALUES ($1, 'test board');
            INSERT INTO lists (id, title) VALUES ($2, 'test list');
            INSERT INTO boards_lists VALUES ($1, $2);
            INSERT INTO cards (id, text) VALUES ($3, 'test card');
            INSERT INTO lists_cards VALUES ($2, $3);
            INSERT INTO activity (entry_id, entry_table, action) VALUES
                ($3, 'cards', 'Created'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated'),
                ($3, 'cards', 'Updated')
        `, [boardId, listId, cardId]).then(() => request);
        });
}
