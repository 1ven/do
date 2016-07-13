import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';
import { DropTarget } from 'react-dnd';
import draggableTypes from '../constants/draggableTypes';
import List from './List';

const listTarget = {
  hover(props, monitor, component) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().listId;
    const targetListId = props.id;

    if (props.cards.length) return;

    props.onCardMove({
      listId: sourceListId,
      cardId: sourceCardId,
    }, {
      listId: targetListId,
    });

    monitor.getItem().listId = targetListId;
  },
};

function DraggableList(props) {
  const listProps = omit(props, ['connectDropTarget']);
  return props.connectDropTarget(
    <div>
      <List
        {...listProps}
      />
    </div>
  );
}

DraggableList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array,
  boardId: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onCardMove: PropTypes.func.isRequired,
};

export default DropTarget(
  draggableTypes.CARD,
  listTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(DraggableList);
