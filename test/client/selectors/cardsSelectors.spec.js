import { assert } from 'chai';
import { getCardsLength, getCardEntity, makeGetCardColors, makeGetCard } from 'client/selectors/cardsSelectors';

describe('cardsSelectors', () => {
  const state = {
    entities: {
      cards: {
        '1': {
          id: '1',
          text: 'test',
          colors: [{
            color: '#ddd',
            active: true,
          }, {
            color: '#eee',
            active: false,
          }],
        },
      },
      lists: {
        '1': {
          id: '1',
          title: 'test',
          cards: ['1'],
        },
      },
    },
  };

  it('should return cards length of particular list', () => {
    assert.deepEqual(getCardsLength(state, { listId: '1' }), 1);
  });

  it('should create `getCardColors` selector which returns array of active card colors', () => {
    const getCardColors = makeGetCardColors();
    assert.deepEqual(getCardColors(state, { id: '1' }), ['#ddd']);
  });

  it('should create `getCard` selector which returns card entity with active colors', () => {
    const getCard = makeGetCard();
    assert.deepEqual(getCard(state, { id: '1' }), {
      id: '1',
      text: 'test',
      colors: ['#ddd'],
    });
  });
});
