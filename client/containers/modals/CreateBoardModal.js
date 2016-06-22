import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { createBoard } from '../../actions/boardsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateBoardModal({ dispatch }) {
  return (
    <Modal
      title="Create board"
      onCloseClick={() => dispatch(hideModal())}
    >
      <FormBox
        onCancelClick={() => dispatch(hideModal())}
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
};

export default connect()(CreateBoardModal);
