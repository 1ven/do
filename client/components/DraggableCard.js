import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import Card from './Card';

let initialListId;

const cardSource = {
  beginDrag(props) {
    initialListId = props.listId;
    return {
      id: props.cardProps.id,
      listId: props.listId,
    };
  },
  isDragging(props, monitor) {
    return props.cardProps.id === monitor.getItem().id;
  },
  endDrag(props, monitor) {
    const targetListId = monitor.getItem().listId;
    props.onEndDrag(initialListId, targetListId);
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const sourceListId = monitor.getItem().listId;
    const sourceCardId = monitor.getItem().id;
    const targetListId = props.listId;
    const targetCardId = props.cardProps.id;

    if (sourceCardId === targetCardId) return;

    props.onMove({
      listId: sourceListId,
      cardId: sourceCardId,
    }, {
      listId: targetListId,
      cardId: targetCardId,
    });

    monitor.getItem().listId = targetListId;
  },
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
  onEndDrag: PropTypes.func.isRequired,
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
