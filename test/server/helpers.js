import _ from 'lodash';
import Promise from 'bluebird';
import { assert } from 'chai';
import db from 'server/db';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import { sql } from 'server/helpers';

export const createEntries = (api, prop = 'title') => {
    return function(num = 10) {
        return Promise.each(_.range(num), (item, i) => {
            return api.create({[prop]: `${api.table} entry ${i + 1}`});
        });
    };
};

export const recreateTables = () => {
    return db.query('DROP TABLE IF EXISTS boards, lists, cards')
    .then(() => db.tx(function() {
        return this.batch(
            [
                db.query(sql('cards.sql')),
                db.query(sql('lists.sql')),
                db.query(sql('boards.sql'))
            ]
        );
    }));
};

export const createBoards = createEntries(boardsApi);
export const createLists = createEntries(listsApi);
export const createCards = createEntries(cardsApi, 'text');
