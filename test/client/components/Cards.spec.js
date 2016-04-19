import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';
import Cards from 'client/components/Cards';

function setup() {
    const props = {
        cards: [
            { id: 1, text: 'card 1' }
        ],
        onCardCreate: sinon.spy()
    };

    const component = shallow(<Cards {...props} />);

    return {
        cards: component.find('.c-card'),
        inputForm: component.find('InputForm'),
        component,
        props
    };
};

describe('<Cards />', () => {
    it('should render cards', () => {
        const { cards, props } = setup();
        assert.equal(cards.length, props.cards.length);
    });

    it('should pass `onCardCreate` callback to <InputForm />', () => {
        const { inputForm, props } = setup();

        inputForm.props().onSubmit();
        assert.equal(props.onCardCreate.callCount, 1);
    });
});
