import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../actions/boardsActions';
import { createNotificationWithTimeout } from '../actions/notificationsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

function EditBoardModal({ hideModal, dispatch, board }) {
  function handleSuccess(payload) {
    const boardTitle = payload.entities.boards[payload.result.board].title;
    hideModal();
    dispatch(createNotificationWithTimeout(
      `Board "${boardTitle}" was successfully updated`,
      'info'
    ));
  }

  return (
    <Modal
      title="Edit board"
      hideModal={hideModal}
    >
      <FormBox
        request={formData => dispatch(updateBoard(board.id, formData))}
        onCancelClick={hideModal}
        onSuccess={handleSuccess}
        rows={[
          <InputBox
            name="title"
            title="Title"
            placeholder="Enter board title"
            value={board.title}
          />,
        ]}
      />
    </Modal>
  );
}

// TODO: may be get `board` from entities by given
// id(from `ownProps.boardId`) instead of `ownProps.board`.
// May be not pass `board` to <EditBoardModal />, pass only `boardId`.
// Because data from props may be stale. In entities data always will be fresh.
// But specifically in this case it's not necessary.

EditBoardModal.propTypes = {
  board: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditBoardModal);
