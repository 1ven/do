import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import draggableTypes from '../constants/draggableTypes';
import List from './List';

const listTarget = {
  hover(props, monitor, component) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().listId;
    const targetListId = props.listProps.data.id;

    if (props.listProps.data.cards.length) return;

    props.onCardMove({
      listId: sourceListId,
      cardId: sourceCardId,
    }, {
      listId: targetListId,
    });

    monitor.getItem().listId = targetListId;
  },
  drop(props, monitor) {
    /* const sourceCardId = monitor.getItem().id; */
    /* const sourceListId = monitor.getItem().listId; */
    /* const targetListId = props.listProps.data.id; */

    /* if (props.listProps.data.cards.length) return; */

    /* props.onCardDrop({ */
    /*   listId: sourceListId, */
    /*   cardId: sourceCardId, */
    /* }, { */
    /*   listId: targetListId, */
    /* }); */
  },
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
  onCardMove: PropTypes.func.isRequired,
  onCardDrop: PropTypes.func.isRequired,
};

export default DropTarget(
  draggableTypes.CARD,
  listTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(DraggableList);
