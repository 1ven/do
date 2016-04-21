import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Card from 'client/components/Card';

function setup() {
    const props = {
        id: 5,
        text: 'card 5',
        onRemoveClick: sinon.spy()
    };
    const component = shallow(<Card {...props} />);

    return {
        cardText: component.find('.c-card__text'),
        removeLink: component.find('.c-card__remove'),
        component,
        props
    };
};

describe('<Card />', () => {
    it('should render card text', () => {
        const { component, props, cardText } = setup();

        assert.equal(cardText.text(), props.text);
    });

    it('should handle onRemoveClick', () => {
        const { props, removeLink } = setup();

        removeLink.simulate('click');
        assert.equal(props.onRemoveClick.callCount, 1, '`onRemoveClick` is not called');
    });

    it('should pass card id to `onRemoveClick` callback', () => {
        const { props, removeLink } = setup();

        removeLink.simulate('click');
        assert(props.onRemoveClick.calledWith(5), '`onRemoveClick` called without id');
    });
});
