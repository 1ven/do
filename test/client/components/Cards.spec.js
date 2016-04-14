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
        cards: component.find('.c-card'),
        component,
        props
    };
};

describe('<Cards />', () => {
    it('should render cards', () => {
        const { cards, props } = setup();
        assert.equal(cards.length, props.cards.length);
    });
});
