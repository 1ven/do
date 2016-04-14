import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Board from 'client/components/Board';

function setup() {
    const props = {
        id: 1,
        title: 'board',
        lists: [2, 5]
    };
    const component = shallow(<Board {...props} />);

    return {
        component,
        props
    };
};

describe('<Board />', () => {
});
