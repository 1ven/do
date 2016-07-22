import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Boards from 'client/components/Boards';

function setup() {
  const props = {
    ids: ['1', '2'],
    spinner: true,
    error: false,
  };
  const component = shallow(
    <Boards {...props} />
  );
  const componentWithError = shallow(
    <Boards {..._.assign({}, props, {
      error: true,
    })} />
  );
  const componentWithoutIds = shallow(
    <Boards {..._.assign({}, props, {
      ids: [],
      error: false,
    })} />
  );

  return {
    props,
    component,
    componentWithError,
    componentWithoutIds,
  };
}

describe('<Boards />', () => {
  it('should render error message when `props.error === true`', () => {
    const { componentWithError } = setup();
    assert.equal(
      componentWithError.find('.b-boards__message').text(),
      'Error loading boards.'
    );
  });

  it('should render error message when `props.ids.length === 0`', () => {
    const { componentWithoutIds } = setup();
    assert.equal(
      componentWithoutIds.find('.b-boards__message').text(),
      'Boards not found.'
    );
  });

  it('should render items', () => {
    const { component } = setup();
    assert.lengthOf(component.find('.b-boards__item'), 2);
  });

  it('should provide board id to <BoardTileContainer />', () => {
    const { component, props } = setup();
    assert.equal(
      component.find('Connect(BoardTile)').at(0).props().id,
      props.ids[0]
    );
  });

  it('should render spinner when `props.spinner === true`', () => {
    const { component } = setup();
    assert.lengthOf(component.find('BoardsSpinner'), 1);
  });
});
