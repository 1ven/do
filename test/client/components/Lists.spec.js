import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Lists from 'client/components/Lists';

function setup() {
  const props = {
    ids: ['1', '2'],
    boardId: '1',
  };
  const component = shallow(<Lists {...props} />);

  return {
    component,
    props,
  };
}

describe('<Lists />', () => {
  it('should render items', () => {
    const { component } = setup();
    assert.lengthOf(component.find('.b-lists__item'), 2);
  });

  it('should provide `boardId` and `listId` to <ListContainer />', () => {
    const { component, props } = setup();
    assert.deepEqual(component.find('Connect(List)').at(0).props(), {
      boardId: props.boardId,
      listId: props.ids[0],
    });
  });
});
