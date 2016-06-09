import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../actions/boardsActions';
import { createNotificationWithTimeout } from '../actions/notificationsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

function CreateBoardModal({ hideModal, dispatch }) {
  function handleFormBoxRequest({ title }) {
    return dispatch(createBoard(title))
      .then(action => {
        if (!action.payload.error) {
          dispatch(createNotificationWithTimeout(
            'Board was successfully created',
            'info'
          ));
        }
        return action;
      })
      .catch(() => {
        dispatch(createNotificationWithTimeout(
          'Something bad happened. Board was not created',
          'error'
        ));
      });
  }

  return (
    <Modal
      title="Create board"
      hideModal={hideModal}
    >
      <FormBox
        onSuccess={hideModal}
        onCancelClick={hideModal}
        request={handleFormBoxRequest}
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
