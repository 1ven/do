import { connect } from 'react-redux';
import { removeBoard, updateBoard, moveBoard, moveBoardSync, toggleStarred } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import { makeGetBoard } from '../selectors/boardsSelectors';
import modalsNames from '../constants/modalsNames';
import DraggableBoardTile from '../components/DraggableBoardTile';


function makeMapStateToProps() {
  const getBoard = makeGetBoard();
  return (state, { id }) => {
    return getBoard(state, { id });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditClick(boardId) {
      dispatch(
        showModal(modalsNames.EDIT_BOARD, {
          boardId,
        })
      );
    },

    onRemoveClick(id) {
      dispatch(
        showModal(modalsNames.CONFIRM, {
          title: 'Remove board?',
          onConfirm() {
            dispatch(removeBoard.request({ id }));
          },
        })
      );
    },

    onToggleStarredClick(id, starred) {
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

export default connect(makeMapStateToProps, mapDispatchToProps)(DraggableBoardTile);
