import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { compose } from 'redux';
import modalsNames from '../constants/modalsNames';
import { removeBoard, updateBoard, moveBoard, moveBoardSync, toggleStarred } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import Boards from '../components/Boards';

function BoardsContainer({
  boards,
  error,
  spinner,
  onBoardTileRemoveClick,
  onBoardTileEditClick,
  onBoardTileToggleStarredClick,
  onMoveTile,
  onDropTile,
}) {
  return error ? (
    <div className="b-boards-message">
      Error loading boards.
    </div>
  ) : !boards.length ? (
    <div className="b-boards-message">
      Boards not found.
    </div>
  ) : (
    <Boards
      items={boards}
      spinner={spinner}
      onRemoveClick={onBoardTileRemoveClick}
      onEditClick={onBoardTileEditClick}
      onToggleStarredClick={onBoardTileToggleStarredClick}
      onMoveTile={onMoveTile}
      onDropTile={onDropTile}
    />
  )
}

BoardsContainer.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  boards: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  spinner: PropTypes.bool,
  error: PropTypes.bool,
  onBoardTileRemoveClick: PropTypes.func.isRequired,
  onBoardTileEditClick: PropTypes.func.isRequired,
  onBoardTileToggleStarredClick: PropTypes.func.isRequired,
};

function mapStateToProps(state, { ids, type }) {
  return {
    boards: ids.map(id => state.entities.boards[id]),
    error: state.pages.main[type].error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onBoardTileEditClick(boardId) {
      dispatch(
        showModal(modalsNames.EDIT_BOARD, {
          boardId,
        })
      );
    },

    onBoardTileRemoveClick(id) {
      dispatch(
        showModal(modalsNames.CONFIRM, {
          title: 'Remove board?',
          onConfirm() {
            dispatch(removeBoard.request({ id }));
          },
        })
      );
    },

    onBoardTileToggleStarredClick(id, starred) {
      dispatch(
        toggleStarred.request({
          starred: !starred,
          id,
        })
      );
    },

    onMoveTile(sourceId, targetId) {
      dispatch(
        moveBoardSync(sourceId, targetId)
      );
    },

    onDropTile(sourceId, targetId) {
      dispatch(
        moveBoard.request({ sourceId, targetId })
      );
    },
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BoardsContainer);
