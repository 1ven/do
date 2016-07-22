import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Notification from 'client/components/Notification';

function setup(subtitle) {
  const props = {
    id: '1',
    text: 'test',
    type: 'info',
    onClick: sinon.spy(),
    subtitle,
  };
  const component = shallow(<Notification {...props} />);

  return {
    props,
    component,
  };
}

describe('<Notification />', () => {
  it('should render notification with modifiers', () => {
    const { component } = setup();
    assert.equal(component.find('.b-notification').props().className, 'b-notification b-notification_type_info');
  });

  it('should render text', () => {
    const { component } = setup();
    assert.equal(component.find('.b-notification').text(), 'test');
  });

  it('should provide `onClick` prop to `.b-notification`', () => {
    const { component, props } = setup();

    component.find('.b-notification').simulate('click');

    assert.equal(props.onClick.callCount, 1);
  });

  it('should render subtitle', () => {
    const { component } = setup('subtitle');
    assert.lengthOf(component.find('.b-notification__subtitle'), 1);
  });

  it('should not render subtitle', () => {
    const { component } = setup();
    assert.lengthOf(component.find('.b-notification__subtitle'), 0);
  });
});
