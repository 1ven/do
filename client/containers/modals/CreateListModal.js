import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { createList } from '../../actions/listsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateListModal({ dispatch, boardId }) {
  return (
    <Modal
      title="Edit list"
      onCloseClick={() => dispatch(hideModal())}
    >
      <FormBox
        onCancelClick={() => dispatch(hideModal())}
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
};

export default connect()(CreateListModal);
