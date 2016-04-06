import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import List from 'client/components/List';

function setup() {
    const props = {
        id: 1,
        title: 'test list 1',
        cards: [
            { id: 1, text: 'card 1' }
        ]
    };

    const component = shallow(<List {...props} />);

    return {
        title: component.find('.c-list__title').text(),
        cards: component.find('Card'),
        component,
        props
    };
};

describe('<List />', () => {
    it('should render title', () => {
        const { title, props } = setup();

        assert.equal(title, props.title);
    });

    it('should render cards', () => {
        const { cards, props } = setup();
        assert.equal(cards.length, props.cards.length);
    });
});
