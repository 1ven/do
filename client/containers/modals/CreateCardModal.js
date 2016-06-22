import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { createCard } from '../../actions/cardsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateCardModal({ dispatch, boardId, listId }) {
  return (
    <Modal
      title="Create card"
      onCloseClick={() => dispatch(hideModal())}
    >
      <FormBox
        request={({ text }) => dispatch(
          createCard.request({ boardId, listId, text })
        )}
        onCancelClick={() => dispatch(hideModal())}
        rows={[
          <InputBox
            name="text"
            title="Text"
            placeholder="Enter card text"
          />,
        ]}
      />
    </Modal>
  );
}

CreateCardModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default connect()(CreateCardModal);
