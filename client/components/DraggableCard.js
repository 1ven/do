import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import omit from 'lodash/omit';
import draggableTypes from '../constants/draggableTypes';
import Card from './Card';

let initialListId;

const cardSource = {
  beginDrag(props) {
    initialListId = props.listId;
    return {
      id: props.id,
      listId: props.listId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
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
    const targetCardId = props.id;

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

function DraggableCard(props) {
  const { isDragging, connectDragSource, connectDropTarget } = props;
  const cardProps = omit(props, [
    'connectDragSource',
    'connectDropTarget',
    'isDragging',
  ]);
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
