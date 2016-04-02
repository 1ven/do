import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardTile from 'client/components/BoardTile';

const setup = () => {
    const props = {
        data: {
            id: 5,
            title: 'board 5'
        },
        onClick: sinon.spy()
    };
    const component = shallow(<BoardTile {...props} />);

    return {
        boardTileLink: component.find('a.c-board-tile'),
        component,
        props
    };
};

describe('<BoardTile />', () => {
    it('should render board title', () => {
        const { component, props } = setup();

        assert(component.children().text(), props.data.title);
    });

    it('should handle onClick event', () => {
        const { props, boardTileLink } = setup();

        boardTileLink.simulate('click');
        assert.equal(props.onClick.callCount, 1);
    });

    it('should pass id to onClick function', () => {
        const { props, boardTileLink } = setup();

        boardTileLink.simulate('click');
        assert(props.onClick.calledWith(props.data.id), 'onClick called without id');
    });
});
