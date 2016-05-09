import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';
import BoardTile from 'client/components/BoardTile';

function setup() {
    const props = {
        id: 5,
        title: 'board 5',
        onRemoveClick: sinon.spy()
    };
    const component = shallow(<BoardTile {...props} />);

    return {
        removeLink: component.find('.b-board-tile__remove'),
        component,
        props
    };
};

describe('<BoardTile />', () => {
    it('should render board title', () => {
        const { component, props } = setup();
        assert.equal(component.find('.b-board-tile__title').text(), props.title);
    });

    // it('should handle `onRemoveClick` callback', () => {
    //     const { removeLink, props } = setup();

    //     removeLink.simulate('click');
    //     assert.equal(props.onRemoveClick.callCount, 1);
    // });

    // it('should pass id  to `onRemoveClick` callback', () => {
    //     const { removeLink, props } = setup();

    //     removeLink.simulate('click');
    //     assert(props.onRemoveClick.calledWith(props.id));
    // });
});
