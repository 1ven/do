import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Lists from 'client/components/Lists';

function setup() {
    const props = {
        lists: [
            { id: 1, title: 'list 1' },
        ],
        onListCreate: sinon.spy()
    };

    const component = shallow(<Lists {...props} />);

    return {
        lists: component.find('.b-list'),
        inputForm: component.find('InputForm'),
        component,
        props
    };
};

describe('<Lists />', () => {
    it('should render lists', () => {
        const { lists, props } = setup();
        assert.equal(lists.length, props.lists.length);
    });


    it('should pass `onListCreate` callback to <InputForm />', () => {
        const { inputForm, props } = setup();

        inputForm.props().onSubmit();
        assert.equal(props.onListCreate.callCount, 1);
    });
});
