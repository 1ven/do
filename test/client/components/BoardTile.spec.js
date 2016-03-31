import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardTile from 'client/components/BoardTile';

const setup = () => {
    const props = {
        data: {
            id: 1,
            title: 'board 1'
        },
        onClick: sinon.spy()
    };
    const component = shallow(<BoardTile {...props} />);

    return { component, props };
};

describe('<BoardTile />', () => {
    it('should render board title', () => {
        const { component, props } = setup();

        assert(component.children().text(), props.data.title);
    });

    it('should simulate click event', () => {
        const { component, props } = setup();

        component.find('a.c-board-tile').simulate('click');
        assert.equal(props.onClick.called, 1);
    });
});
