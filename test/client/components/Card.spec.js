import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Card from 'client/components/Card';

function setup() {
    const props = {
        id: 1,
        text: 'test card'
    };

    const component = shallow(<Card {...props} />);

    return {
        component,
        props
    };
};

describe('<Card />', () => {
    it('should render text', () => {
        const { component, props } = setup();
        assert.equal(component.find('.c-card').at(0).text(), props.text);
    });
});
