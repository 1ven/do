import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleReduxFormSubmit } from '../../utils';
import Modal from '../../components/Modal';
import _ListForm from '../forms/ListForm';
import { createList } from '../../actions/listsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateListModal({ dispatch, boardId }) {
  const ListForm = _ListForm();
  return (
    <Modal
      title="Create list"
      onClose={() => dispatch(hideModal())}
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
