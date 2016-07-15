import { createSelector } from 'reselect';

const getStateResults = (state) => state.search.results;

export const getResults = createSelector(
  [ getStateResults ],
  (results) => {
    if (!results) {
      return undefined;
    }

    return results.reduce((acc, result) => {
      const isTypeInAcc = acc.filter(group => group.type === result.type).length === 1;
      const resultItem = {
        title: result.content,
        link: result.link,
      };

      if (!isTypeInAcc) {
        return [...acc, {
          type: result.type,
          items: [resultItem],
        }];
      }

      return acc.map(group => {
        if (group.type === result.type) {
          return {
            ...group,
            items: [...group.items, resultItem],
          };
        }
        return group;
      });
    }, []);
  }
);
