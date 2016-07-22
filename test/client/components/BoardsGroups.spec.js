import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import BoardsGroups from 'client/components/BoardsGroups';

function setup() {
  const props = {
    groups: [{
      ids: ['1', '2'],
      title: 'test',
      type: 'test type',
      count: 5,
      hidden: false,
      spinner: true,
      error: false,
    }],
    onGroupTitleClick: sinon.spy(),
  };
  const component = shallow(
    <BoardsGroups {...props} />
  );

  return {
    props,
    component,
  };
}

describe('<BoardsGroups />', () => {
  it('should render groups', () => {
    const { component, props } = setup();

    assert.lengthOf(component.find('.b-boards-groups__group'), 1);
  });

  it('should provide `onGroupTitleClick` callback to <Toggle /> `onLinkClick` prop', () => {
    const { component, props } = setup();

    component.find('Toggle').props().onLinkClick();

    assert.equal(props.onGroupTitleClick.callCount, 1);
  });

  it('should provide opposite `hidden` variable value to <Toggle /> `isActive` prop', () => {
    const { component, props } = setup();
    assert.deepEqual(
      component.find('Toggle').props().isActive,
      !props.hidden
    );
  });
});
