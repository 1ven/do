import _ from 'lodash';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';

const createEntry = function(api, prop = 'title') {
    return function(num = 10) {
        const promises = _.range(num).map(() => {
            return api.create({[prop]: `${api.table} entry`});
        });
        return Promise.all(promises);
    };
};

export const createBoards = createEntry(boardsApi);
export const createLists = createEntry(listsApi);
export const createCards = createEntry(cardsApi, 'text');
