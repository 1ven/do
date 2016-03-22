import { assert } from 'chai';
import listsApi from 'server/api/lists-api';
import fs from 'fs';
import db from 'server/db';

const createListsSql = fs.readFileSync('server/db/tables/lists.sql', 'utf8');

describe('lists api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS lists')
            .then(() => db.query(createListsSql));
    });

    describe('addCard', () => {
        it('should addCard to list');
    });

    describe('removeCard', () => {
        it('should removeCard from list');
    });
});

