import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Activity from 'client/components/Activity';

function setup() {
  const props = {
    items: [{
      type: 'card',
      action: 'Deleted',
      date: '10/10/16',
      entry: {
        title: 'test',
      },
    }, {
      type: 'list',
      action: 'Created',
      date: '10/10/16',
      entry: {
        title: 'Very very very long title',
      },
    }],
  };
  const component = shallow(<Activity {...props} />);

  return {
    component,
  };
}

describe('<Activity />', () => {
  it('should render activity items', () => {
    const { component } = setup();
    assert.equal(component.find('.b-activity__item').length, 2);
  });

  it('should render activity item', () => {
    const { component } = setup();
    const item = component.find('.b-activity__item').at(1);

    assert.equal(item.find('.b-activity__item-text').text(), "Created 'Very very ...' list");
    assert.equal(item.find('.b-activity__date').text(), '10/10/16');
  });
});
