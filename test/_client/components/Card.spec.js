import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Card from 'client/components/Card';

function setup(customProps) {
    const props = _.assign({}, {
        id: 5,
        text: 'card 5',
        onRemoveClick: sinon.spy(),
        onInputFormSubmit: sinon.spy(),
        onTextClick: sinon.spy()
    }, customProps);
    const component = shallow(<Card {...props} />);

    return {
        inputForm: component.find('InputForm'),
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
        const { props, removeLink } = setup({
            id: 3
        });

        removeLink.simulate('click');
        assert(props.onRemoveClick.calledWith(3), '`onRemoveClick` called without id');
    });

    it('should call `onInputFormSubmit` with card id and text', () => {
        const { props, inputForm } = setup({
            id: 3,
            isEditing: true
        });

        inputForm.at(0).props().onSubmit(props.text);
        assert(props.onInputFormSubmit.calledWith(props.id, props.text));
    });

    it('should handle `onTextClick` callback', () => {
        const { props, cardText } = setup();

        cardText.simulate('click');
        assert.equal(props.onTextClick.callCount, 1);
    });

    it('should pass card id to `onTextClick` callback', () => {
        const { props, cardText } = setup({
            id: 3
        });

        cardText.simulate('click');
        assert(props.onTextClick.calledWith(3));
    });
});
