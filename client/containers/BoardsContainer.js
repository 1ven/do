import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import modalsNames from '../constants/modalsNames';
import { removeBoard, updateBoard } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import Boards from '../components/Boards';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function BoardsContainer({
  boards,
  onBoardTileRemoveClick,
  onBoardTileEditClick,
  onBoardTileToggleStarredClick,
  onMoveTile,
}) {
  return !boards.length ? (
    <div className="b-boards-not-found">
      Boards not found
    </div>
  ) : (
    <Boards
      items={boards}
      onRemoveClick={onBoardTileRemoveClick}
      onEditClick={onBoardTileEditClick}
      onToggleStarredClick={onBoardTileToggleStarredClick}
      onMoveTile={onMoveTile}
    />
  )
}

BoardsContainer.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  boards: PropTypes.array.isRequired,
  onBoardTileRemoveClick: PropTypes.func.isRequired,
  onBoardTileEditClick: PropTypes.func.isRequired,
  onBoardTileToggleStarredClick: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    boards: ownProps.ids.map(id => state.entities.boards[id]),
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
      dispatch(removeBoard.request({ id }));
    },

    onBoardTileToggleStarredClick(id, starred) {
      dispatch(
        updateBoard.request({
          id,
          props: {
            starred: !starred,
          },
        })
      );
    },

    onMoveTile(targetId, sourceId) {},
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BoardsContainer);
