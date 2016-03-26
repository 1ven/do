import _ from 'lodash';
import Promise from 'bluebird';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';

const createEntries = function(api, prop = 'title') {
    return function(num = 10) {
        return Promise.each(_.range(num), (item, i) => {
            return api.create({[prop]: `${api.table} entry ${i + 1}`});
        });
    };
};

export const createBoards = createEntries(boardsApi);
export const createLists = createEntries(listsApi);
export const createCards = createEntries(cardsApi, 'text');
export { createEntries };
