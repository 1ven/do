import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardTile from 'client/components/BoardTile';

function setup() {
    const props = {
        data: {
            id: 5,
            title: 'board 5'
        },
    };
    const component = shallow(<BoardTile {...props} />);

    return {
        component,
        props
    };
};

describe('<BoardTile />', () => {
    it('should render board title', () => {
        const { component, props } = setup();

        assert.equal(component.find('.b-tile__top-left').text(), props.data.title);
    });
});
