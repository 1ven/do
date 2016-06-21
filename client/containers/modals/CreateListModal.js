import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
/* import { createList } from '../actions/listsActions'; */
/* import { addListId, incListsLength } from '../actions/boardsActions'; */
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';

function CreateListModal({ hideModal, dispatch, boardId }) {
  function handleSuccess(payload) {
    const listId = payload.result.list;
    dispatch(addListId(boardId, listId));
    dispatch(incListsLength(boardId));
    hideModal();
  }

  return (
    <Modal
      title="Edit list"
      hideModal={hideModal}
    >
      <FormBox
        onSuccess={handleSuccess}
        onCancelClick={hideModal}
        request={({ title }) => dispatch(createList(boardId, title))}
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
