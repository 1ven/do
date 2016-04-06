import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import FullBoard from 'client/components/FullBoard';

function setup() {
    const props = {
        id: 1,
        title: 'board',
        lists: [
            { id: 1, title: 'test 1', cards: [2, 6] },
            { id: 2, title: 'test 2', cards: null }
        ]
    };
    const component = shallow(<FullBoard {...props} />);

    return {
        listContainers: component.find('Connect'),
        col: component.find('.c-full-board__col'),
        component,
        props
    };
};

describe('<FullBoard />', () => {
    it('should render lists', () => {
        const { col, props } = setup();

        assert.equal(col.length, props.lists.length);
    });

    it('should provide cards array to <ListContainer />', () => {
        const { listContainers, props } = setup();

        assert.deepEqual(listContainers.at(0).props(), props.lists[0]);
    });
});
