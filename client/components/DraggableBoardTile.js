import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import draggableTypes from '../constants/draggableTypes';
import BoardTile from './BoardTile';

const boardTileSource = {
  beginDrag(props) {
    return {
      id: props.boardTileProps.data.id,
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

function DraggableBoardTile(props) {
  const { isDragging, connectDragSource, connectDropTarget } = props;

  const tileProps = omit(props, [
    'connectDragSource',
    'connectDropTarget',
    'isDragging',
  ]);

  return compose(connectDragSource, connectDropTarget)(
    <div>
      <BoardTile
        {...tileProps}
        isEmpty={isDragging}
      />
    </div>
  );
}

DraggableBoardTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  starred: PropTypes.bool.isRequired,
  listsLength: PropTypes.number.isRequired,
  cardsLength: PropTypes.number.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onToggleStarredClick: PropTypes.func.isRequired,
  onMoveTile: PropTypes.func.isRequired,
  onDropTile: PropTypes.func.isRequired,
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
