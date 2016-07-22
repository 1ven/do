import React from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import App from 'client/components/App';

function setup() {
  const onScroll = sinon.spy();
  const component = shallow(
    <App {...{ onScroll }}>
      <div>Test</div>
    </App>
  );

  return {
    component,
    onScroll,
  };
}

describe('<App />', () => {
  it('should render children', () => {
    const { component } = setup();
    assert.equal(
      component.find('.b-route-handler').childAt(0).html(),
      '<div>Test</div>'
    );
  });

  it('should render <Scrollbar />', () => {
    const { component } = setup();
    assert.lengthOf(component.find('Scrollbar'), 1);
  });

  it('should provide to <Scrollbar /> `onScroll` callback', () => {
    const { component, onScroll } = setup();

    component.props().onScroll();

    assert.equal(onScroll.callCount, 1);
  });

  it('should render <ProgressBarContainer />', () => {
    const { component } = setup();
    assert.lengthOf(component.find('Connect(ProgressBar)'), 1);
  });

  it('should render <Header />', () => {
    const { component } = setup();
    assert.lengthOf(component.find('Header'), 1);
  });

  it('should render <NotificationsContainer />', () => {
    const { component } = setup();
    assert.lengthOf(component.find('Connect(Notifications)'), 1);
  });

  it('should render <ModalContainer />', () => {
    const { component } = setup();
    assert.lengthOf(component.find('Connect(ModalContainer)'), 1);
  });
});
