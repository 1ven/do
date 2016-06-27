import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import Card from './Card';

let lastTarget;

const cardSource = {
  beginDrag(props) {
    return {
      id: props.cardProps.id,
      listId: props.listId,
      lastListId: props.listId,
    };
  },
  isDragging(props, monitor) {
    return props.cardProps.id === monitor.getItem().id;
  },
  endDrag() {
    lastTarget = undefined;
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().lastListId;
    const targetCardId = props.cardProps.id;
    const targetListId = props.listId;

    if (sourceCardId === targetCardId) return;

    lastTarget = {
      cardId: targetCardId,
      listId: targetListId,
    };

    props.onMove({
      cardId: sourceCardId,
      listId: sourceListId,
    }, lastTarget);

    monitor.getItem().lastListId = targetListId;
  },
  drop(props, monitor) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().listId;

    if (!lastTarget || sourceCardId === lastTarget.cardId) return;

    props.onDrop({
      cardId: sourceCardId,
      listId: sourceListId,
    }, lastTarget);
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
