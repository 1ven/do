import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Lists from 'client/components/Lists';

function setup() {
    const props = {
        lists: [
            { id: 1, title: 'list 1' },
        ]
    };

    const component = shallow(<Lists {...props} />);

    return {
        lists: component.find('.c-list'),
        component,
        props
    };
};

describe('<Lists />', () => {
    it('should render lists', () => {
        const { lists, props } = setup();
        assert.equal(lists.length, props.lists.length);
    });
});
