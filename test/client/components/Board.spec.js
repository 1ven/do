import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Board from 'client/components/Board';

function setup() {
  const props = {
    id: '1',
    title: 'test',
    description: 'test board',
    lists: ['1', '2'],
    onAddListBtnClick: sinon.spy(),
    onEditBoardClick: sinon.spy(),
  };

  const component = shallow(
    <Board {...props} />
  );
  const componentWithoutDesc = shallow(
    <Board {..._.omit(props, ['description'])} />
  );

  return {
    component,
    componentWithoutDesc,
    props,
  };
}

describe('<Board />', () => {
  it('should render title', () => {
    const { component, props } = setup();
    assert.equal(component.find('.b-board__title').text(), props.title);
  });

  it('should render description', () => {
    const { component, props } = setup();
    assert.equal(component.find('.b-board__description').text(), props.description);
  });

  it('should render `No description` when `props.description` is not provided', () => {
    const { componentWithoutDesc, props } = setup();
    assert.equal(componentWithoutDesc.find('.b-board__description').text(), 'No description');
  });

  it('should pass `onEditBoardClick` to `.b-board__edit` `onClick` prop', () => {
    const { component, props } = setup();

    component.find('.b-board__edit').simulate('click');

    assert.equal(props.onEditBoardClick.callCount, 1);
  });

  it('should pass lists array to <Lists />', () => {
    const { component, props } = setup();
    assert.deepEqual(
      component.find('Lists').props().ids,
      props.lists
    );
  });

  it('should pass board id to <Lists />', () => {
    const { component, props } = setup();
    assert.equal(
      component.find('Lists').props().boardId,
      props.id
    );
  });
});
