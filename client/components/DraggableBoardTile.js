import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import BoardTile from './BoardTile';

const boardTileSource = {
  beginDrag(props) {
    return {
      id: props.boardTileProps.data.id,
      index: props.index,
    };
  },
};

const boardTileTarget = {
  hover(props, monitor, component) {
    const sourceId = monitor.getItem().id;
    const targetId = props.boardTileProps.data.id;

    if (sourceId === targetId) return;

    props.onMoveTile(sourceId, targetId);
  },
  drop(props, monitor) {
    const sourceId = monitor.getItem().id;
    const targetId = props.boardTileProps.data.id;

    props.onDropTile(sourceId, targetId);
  },
};

function DraggableBoardTile({
  isDragging,
  connectDragSource,
  connectDropTarget,
  boardTileProps,
}) {
  return compose(connectDragSource, connectDropTarget)(
    <div>
      <BoardTile
        {...boardTileProps}
        isEmpty={isDragging}
      />
    </div>
  );
}

DraggableBoardTile.propTypes = {
  index: PropTypes.number.isRequired,
  onMoveTile: PropTypes.func.isRequired,
  onDropTile: PropTypes.func.isRequired,
  boardTileProps: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default compose(
  DragSource(
    draggableTypes.BOARD_TILE,
    boardTileSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
  DropTarget(
    draggableTypes.BOARD_TILE,
    boardTileTarget,
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  )
)(DraggableBoardTile);
