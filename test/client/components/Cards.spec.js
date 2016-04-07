import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Cards from 'client/components/Cards';

function setup() {
    const props = {
        cards: [
            { id: 1, text: 'card 1' }
        ]
    };

    const component = shallow(<Cards {...props} />);

    return {
        cards: component.find('Card'),
        component,
        props
    };
};

describe('<Cards />', () => {
    it('should render cards', () => {
        const { cards, props } = setup();
        assert.equal(cards.length, props.cards.length);
    });

    it('should provide props to <Card />', () => {
        const { cards, props } = setup();
        assert.deepEqual(cards.at(0).props(), props.cards[0]);
    });
});
