import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Animation from 'client/components/Animation';

function setup() {
  const props = {
    name: 'test',
    className: 'b-test',
    duration: 1000,
  };
  const component = shallow(
    <Animation {...props}>
      <div>Test</div>
    </Animation>
  );

  return {
    component,
    props,
  };
}

describe('<Animation />', () => {
  it('should render children', () => {
    const { component } = setup();
    assert.equal(
      component.find('ReactCSSTransitionGroup').childAt(0).html(),
      '<div>Test</div>'
    );
  });

  it('should render <ReactCSSTransitionGroup />', () => {
    const { component, props } = setup();
    const tProps = component.find('ReactCSSTransitionGroup').props();

    assert.equal(tProps.component, 'div');
    assert.equal(tProps.transitionName, props.name);
    assert.equal(tProps.transitionEnterTimeout, props.duration);
    assert.equal(tProps.transitionLeaveTimeout, props.duration);
    assert.equal(tProps.className, props.className);
  });

  it('should have defaultProps', () => {
    assert.deepEqual(Animation.defaultProps, {
      duration: 150
    });
  });
});
