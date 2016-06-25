import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import modalsNames from '../constants/modalsNames';
import { removeBoard, updateBoard } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import BoardTile from '../components/BoardTile';
import Boards from '../components/Boards';
/* import { DragDropContext } from 'react-dnd'; */
/* import HTML5Backend from 'react-dnd-html5-backend'; */
/* import DraggableBoardTile from '../components/DraggableBoardTile'; */

function BoardsContainer({
  boards,
  onBoardTileRemoveClick,
  onBoardTileEditClick,
  onBoardTileToggleStarredClick,
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
  };
}

/* export default DragDropContext(HTML5Backend)(BoardsContainer); */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsContainer);
