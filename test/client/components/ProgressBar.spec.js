import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import ProgressBar from 'client/components/ProgressBar';

function setup(value) {
  return shallow(<ProgressBar {...{ value }}/>);
}

describe('<ProgressBar />', () => {
  it('should render progress bar with width equal to `props.value`', () => {
    const component = setup(30);
    assert.equal(component.find('.b-progress-bar').props().style.width, '30%');
  });

  it('should set opacity to 1 if value is not 100 or 0', () => {
    const component = setup(30);
    assert.equal(component.find('.b-progress-bar').props().style.opacity, 1);
  });

  it('should set opacity to 0 if value is 100 or 0', () => {
    let component = setup(100);
    assert.equal(component.find('.b-progress-bar').props().style.opacity, 0);

    component = setup(0);
    assert.equal(component.find('.b-progress-bar').props().style.opacity, 0);
  });

  it('should set transition to `opacity 1s` if value is 100', () => {
    const component = setup(100);
    assert.equal(component.find('.b-progress-bar').props().style.transition, 'opacity 1s');
  });

  it('should set transition to `width .2s` if value is not 100', () => {
    const component = setup(5);
    assert.equal(component.find('.b-progress-bar').props().style.transition, 'width .2s');
  });
});
