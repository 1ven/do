import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import _BoardForm from '../forms/BoardForm';
import { updateBoard } from '../../actions/boardsActions';
import { hideModal } from '../../actions/modalActions'; 

function EditBoardModal({ dispatch, board }) {
  const BoardForm = _BoardForm(state => ({
    initialValues: {
      title: state.entities.boards[board.id].title,
    },
  }));

  function handleSubmit(values) {
    return new Promise((resolve, reject) => {
      dispatch(updateBoard.request({
        id: board.id,
        props: values,
        resolve,
        reject,
      }));
    });
  }

  return (
    <Modal
      title="Edit board"
      onCloseClick={() => dispatch(hideModal())}
    >
      <BoardForm
        onSubmit={handleSubmit}
        onFormBoxCancelClick={() => dispatch(hideModal())}
      />
    </Modal>
  );
}

EditBoardModal.propTypes = {
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    board: state.entities.boards[ownProps.boardId],
  };
}

export default connect(
  mapStateToProps
)(EditBoardModal);
