import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';
import List from 'client/components/List';

function setup() {
    const props = {
        id: 1,
        title: 'list 1',
        cardsIds: [1, 4, 5],
        onRemoveClick: sinon.spy()
    };

    const component = shallow(<List {...props} />);

    return {
        cardsContainer: component.find('Connect(Cards)'),
        listTitle: component.find('.c-list__top-left'),
        removeLink: component.find('.c-list__remove'),
        component,
        props
    };
};

describe('<List />', () => {
    it('should render list title', () => {
        const { listTitle, props } = setup();
        assert.equal(listTitle.text(), props.title);
    });

    it('should pass listId to <CardsContainer />', () => {
        const { cardsContainer, props } = setup();
        assert.equal(cardsContainer.at(0).props().listId, props.id);
    });

    it('should pass listId and cardsIds to <CardsContainer />', () => {
        const { cardsContainer, props } = setup();
        assert.deepEqual(cardsContainer.at(0).props().cardsIds, props.cardsIds);
    });

    it('should handle onRemoveClick', () => {
        const { props, removeLink } = setup();

        removeLink.simulate('click');
        assert.equal(props.onRemoveClick.callCount, 1, '`onRemoveClick` is not called');
    });

    it('should pass card id to `onRemoveClick` callback', () => {
        const { props, removeLink } = setup();

        removeLink.simulate('click');
        assert(props.onRemoveClick.calledWith(props.id), '`onRemoveClick` called without id');
    });
});
