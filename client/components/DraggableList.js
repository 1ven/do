import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import draggableTypes from '../constants/draggableTypes';
import List from './List';

const listTarget = {
  hover(props, monitor, component) {},
};

function DraggableList({
  connectDropTarget,
  listProps,
}) {
  return connectDropTarget(
    <div>
      <List
        {...listProps}
      />
    </div>
  );
}

DraggableList.propTypes = {
  listProps: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(
  draggableTypes.LIST,
  listTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(DraggableList);
