import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Btn from 'client/components/Btn';

function setup() {
  const props = {
    text: 'test',
    tagName: 'button',
    modifiers: ['test'],
    onClick: sinon.spy(),
    nodeAttrs: {
      type: 'text',
    },
    spinner: false,
  };
  const component = shallow(<Btn {...props} />);
  const componentWithSpinner = shallow(<Btn {..._.assign({}, props, {
    spinner: true,
  })} />);

  return {
    component,
    componentWithSpinner,
    props,
  };
}

describe('<Btn />', () => {
  it('should render btn with modifiers', () => {
    const { component, props } = setup();
    assert.equal(component.props().className, 'b-btn b-btn_test');
  });

  it('should render btn text', () => {
    const { component, props } = setup();
    assert.equal(component.text(), props.text);
  });

  it('should render spinner', () => {
    const { componentWithSpinner, props } = setup();
    assert.lengthOf(componentWithSpinner.find('Spinner'), 1);
  });
});
