import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleReduxFormSubmit } from '../../utils';
import Modal from '../../components/Modal';
import ListForm from '../forms/ListForm';
import { createList } from '../../actions/listsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateListModal({ dispatch, boardId }) {
  return (
    <Modal
      title="Edit list"
      onCloseClick={() => dispatch(hideModal())}
    >
      <ListForm
        onSubmit={handleReduxFormSubmit(
          dispatch, createList.request, { boardId }
        )}
        onFormBoxCancelClick={() => dispatch(hideModal())}
      />
    </Modal>
  );
}

CreateListModal.propTypes = {
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CreateListModal);
