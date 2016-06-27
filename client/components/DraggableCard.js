import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import Card from './Card';

const cardSource = {
  beginDrag(props) {
    const listId = props.listId;
    const cardId = props.cardProps.id;

    props.onBeginDrag(listId, cardId);

    return {
      id: cardId,
      listId,
    };
  },
  isDragging(props, monitor) {
    return props.cardProps.id === monitor.getItem().id;
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().listId;
    const targetCardId = props.cardProps.id;
    const targetListId = props.listId;

    if (sourceCardId === targetCardId) return;

    props.onMove({
      cardId: sourceCardId,
      listId: sourceListId,
    }, {
      cardId: targetCardId,
      listId: targetListId,
    });

    monitor.getItem().listId = targetListId;
  },
  drop(props, monitor) {
    /* console.log(monitor.getDropResult()); */
    /* const sourceCardId = monitor.getItem().id; */
    /* const sourceListId = monitor.getItem().listId; */

    /* if (!lastTarget || sourceCardId === lastTarget.cardId) return; */

    /* props.onDrop({ */
    /*   cardId: sourceCardId, */
    /*   listId: sourceListId, */
    /* }, lastTarget); */
  }
};

function DraggableCard({
  isDragging,
  connectDragSource,
  connectDropTarget,
  cardProps,
}) {
  return compose(connectDragSource, connectDropTarget)(
    <div>
      <Card
        {...cardProps}
        isEmpty={isDragging}
      />
    </div>
  );
}

DraggableCard.propTypes = {
  listId: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBeginDrag: PropTypes.func.isRequired,
  cardProps: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default compose(
  DragSource(
    draggableTypes.CARD,
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
  DropTarget(
    draggableTypes.CARD,
    cardTarget,
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  )
)(DraggableCard);
