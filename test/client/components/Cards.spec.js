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
        onCardCreate: sinon.spy(),
        onCardRemoveClick: sinon.spy()
    };

    const component = shallow(<Cards {...props} />);

    return {
        inputForm: component.find('InputForm'),
        card: component.find('Card'),
        component,
        props
    };
};

describe('<Cards />', () => {
    it('should render cards', () => {
        const { card, props } = setup();
        assert.equal(card.length, props.cards.length);
    });

    it('should pass `onCardCreate` callback to <InputForm />', () => {
        const { inputForm, props } = setup();

        inputForm.props().onSubmit();
        assert.equal(props.onCardCreate.callCount, 1);
    });

    it('should pass `onCardRemoveClick` callback to <Card />', () => {
        const { card, props } = setup();

        card.props().onRemoveClick();
        assert.equal(props.onCardRemoveClick.callCount, 1);
    });
});
