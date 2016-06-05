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
                    type: 'Boards',
                    link: '/boards/1'
                }, {
                    id: '1',
                    content: 'This text about wild life and nature',
                    type: 'Cards',
                    link: '/boards/1/cards/1'
                }]));
            });
        });

        it('should return result matching `wo` query', () => {
            return Finder.find('wo').then(result => {
                assert.isTrue(exists(result, [{
                    id: '2',
                    content: 'What a wonderful life',
                    type: 'Cards',
                    link: '/boards/2/cards/2'
                }]));
            });
        });

        it('should return result matching `ab lif` query', () => {
            return Finder.find('ab lif').then(result => {
                assert.isTrue(exists(result, [{
                    id: '1',
                    content: 'This text about wild life and nature',
                    type: 'Cards',
                    link: '/boards/1/cards/1'
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
                i.type === obj.type &&
                i.link === obj.link
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
        INSERT INTO boards_lists VALUES ('1', '1'), ('2', '2'), ('2', '3');
        INSERT INTO cards(id, text)
            VALUES ('1', 'This text about wild life and nature'), ('2', 'What a wonderful life');
        INSERT INTO lists_cards VALUES ('1', '1'), ('2', '2')
    `);
}
