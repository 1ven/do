import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import _ListForm from '../forms/ListForm';
import { updateList } from '../../actions/listsActions';
import { hideModal } from '../../actions/modalActions'; 

function EditListModal({ dispatch, listId }) {
  const ListForm = _ListForm(state => ({
    initialValues: {
      title: state.entities.lists[listId].title,
    },
  }));

  function handleSubmit(values) {
    return new Promise((resolve, reject) => {
      dispatch(updateList.request({
        id: listId,
        props: values,
        resolve,
        reject,
      }));
    });
  }

  return (
    <Modal
      title="Edit list"
      onClose={() => dispatch(hideModal())}
    >
      <ListForm
        onSubmit={handleSubmit}
        onFormBoxCancelClick={() => dispatch(hideModal())}
      />
    </Modal>
  );
}

EditListModal.propTypes = {
  listId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditListModal);
