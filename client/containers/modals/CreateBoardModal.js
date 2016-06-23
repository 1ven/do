import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleReduxFormSubmit } from '../../utils';
import Modal from '../../components/Modal';
import CreateBoardForm from '../forms/CreateBoardForm';
import { createBoard } from '../../actions/boardsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateBoardModal({ dispatch }) {
  return (
    <Modal
      title="Create board"
      onCloseClick={() => dispatch(hideModal())}
    >
      <CreateBoardForm
        onSubmit={handleReduxFormSubmit(dispatch, createBoard.request)}
        onFormBoxCancelClick={() => dispatch(hideModal())}
      />
    </Modal>
  );
}

CreateBoardModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CreateBoardModal);
