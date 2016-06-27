import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import Card from './Card';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.cardProps.id,
      listId: props.listId,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const sourceCardId = monitor.getItem().id;
    const sourceListId = monitor.getItem().listId;
    const targetCardId = props.cardProps.id;
    const targetListId = props.listId;

    if (sourceCardId === targetCardId) return;

    // possible remove this condition. and remove it at tile too.
    if (monitor.isOver()) return;

    props.onMoveCard({
      cardId: sourceCardId,
      listId: sourceListId,
    }, {
      cardId: targetCardId,
      listId: targetListId,
    });
    /* lastTargetId = targetId; */

    monitor.getItem().listId = targetListId;
  },
  drop(props, monitor) {
    const sourceId = monitor.getItem().id;
    /* props.onDropCard(sourceId, lastTargetId); */
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
  onMoveCard: PropTypes.func.isRequired,
  onDropCard: PropTypes.func.isRequired,
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
