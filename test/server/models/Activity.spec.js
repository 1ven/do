import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import Activity from 'server/models/Activity';

const cardId = shortid.generate();

describe('Activity', () => {
    beforeEach(recreateTables);

    describe('create', () => {
        it('should create activity and return created entry', () => {
            return db.none('INSERT INTO cards(id, text) VALUES ($1, $2)', [cardId, 'test card'])
                .then(() => Activity.create(cardId, 'cards', 'created'))
                .then(entry => {
                    assert.property(entry, 'id');
                    assert.property(entry, 'created_at');
                    assert.deepEqual(_.omit(entry, ['id', 'created_at']), {
                        action: 'created',
                        table: 'cards',
                        entry: {
                            id: cardId,
                            text: 'test card',
                            link: `/boards/${boardId}/cards/${cardId}`
                        }
                    });
                });
        });
    });
});
