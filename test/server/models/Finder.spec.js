import { assert } from 'chai';
import _ from 'lodash';
import { recreateTables } from '../helpers';
import db from 'server/db';
import sql from 'server/utils/sql';
import Finder from 'server/models/Finder';

describe('Finder', () => {
    beforeEach(() => (
        recreateTables()
            .then(() => db.none(sql('views.sql')))
            .then(setup)
    ));

    describe('find', () => {
        it('should return result matching `nature` query', () => {
            return Finder.find('nature').then(result => {
                assert.isTrue(exists(result, [{
                    id: '1',
                    content: 'Nature',
                    type: 'boards'
                }, {
                    id: '1',
                    content: 'Wild nature',
                    type: 'lists'
                }, {
                    id: '1',
                    content: 'This text about wild life and nature',
                    type: 'cards'
                }]));
            });
        });

        it('should return result matching `wo` query', () => {
            return Finder.find('wo').then(result => {
                assert.isTrue(exists(result, [{
                    id: '3',
                    content: 'Wonderful life',
                    type: 'lists'
                }, {
                    id: '2',
                    content: 'What a wonderful life',
                    type: 'cards'
                }]));
            });
        });

        it('should return result matching `ab lif` query', () => {
            return Finder.find('ab lif').then(result => {
                assert.isTrue(exists(result, [{
                    id: '2',
                    content: 'About life',
                    type: 'lists'
                }, {
                    id: '1',
                    content: 'This text about wild life and nature',
                    type: 'cards'
                }]));
            });
        });
    });
});

function exists(result, expected) {
    return expected.filter(obj => {
        const exist = result.filter(i => {
            return (
                i.id === obj.id &&
                i.content === obj.content &&
                i.type === obj.type
            );
        }).length === 1;

        if (!exist) { throw new Error(`\`${obj.content}\` does not exist in array`); }

        return true;
    }).length === expected.length;
}

function setup() {
    return db.none(`
        INSERT INTO boards(id, title)
        VALUES ('1', 'Nature'), ('2', 'Life');
        INSERT INTO lists(id, title)
        VALUES ('1', 'Wild nature'), ('2', 'About life'), ('3', 'Wonderful life');
        INSERT INTO cards(id, text)
        VALUES ('1', 'This text about wild life and nature'), ('2', 'What a wonderful life')
    `);
}
