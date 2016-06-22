import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { createList } from '../../actions/listsActions';

function CreateListModal({ hideModal, dispatch, boardId }) {
  return (
    <Modal
      title="Edit list"
      hideModal={hideModal}
    >
      <FormBox
        onCancelClick={hideModal}
        request={({ title }) => dispatch(createList.request({ boardId, title }))}
        rows={[
          <InputBox
            title="Title"
            name="title"
            placeholder="Enter list title"
          />,
        ]}
      />
    </Modal>
  );
}

CreateListModal.propTypes = {
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default connect()(CreateListModal);
