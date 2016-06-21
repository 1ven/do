import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardsActions';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';

function CreateBoardModal({ hideModal, dispatch }) {
  return (
    <Modal
      title="Create board"
      hideModal={hideModal}
    >
      <FormBox
        onSuccess={hideModal}
        onCancelClick={hideModal}
        request={({ title }) => dispatch(
          createBoard.request({ title })
        )}
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
