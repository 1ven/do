import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../actions/boardsActions';
import { createNotificationWithTimeout } from '../actions/notificationsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

function CreateBoardModal({ hideModal, dispatch }) {
  function handleSuccess(payload) {
    const boardTitle = payload.entities.boards[payload.result.board].title;
    hideModal();
    dispatch(createNotificationWithTimeout(
      `Board "${boardTitle}" was successfully created`,
      'info'
    ));
  }

  return (
    <Modal
      title="Create board"
      hideModal={hideModal}
    >
      <FormBox
        onSuccess={handleSuccess}
        onCancelClick={hideModal}
        request={({ title }) => dispatch(createBoard(title))}
        rows={[
          <InputBox
            title="Title"
            name="title"
            placeholder="Enter board title"
          />,
        ]}
      />
    </Modal>
  );
}

CreateBoardModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default connect()(CreateBoardModal);
