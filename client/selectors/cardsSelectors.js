import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

const getCardEntity = (state, { id }) => state.entities.cards[id];

const makeGetCardColors = () => createSelector(
  [ getCardEntity ],
  (entity) => {
    return entity.colors.filter(c => c.active).map(c => c.color);
  }
);

export const makeGetCard = () => {
  const getCardColors = makeGetCardColors();
  return createSelector(
    [ getCardEntity, getCardColors ],
    (entity, colors) => {
      return {
        ...entity,
        colors,
      };
    }
  );
}
