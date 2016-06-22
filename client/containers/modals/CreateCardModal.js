import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { createCard } from '../../actions/cardsActions';

function CreateCardModal({ hideModal, dispatch, boardId, listId }) {
  return (
    <Modal
      title="Create card"
      hideModal={hideModal}
    >
      <FormBox
        request={({ text }) => dispatch(
          createCard.request({ boardId, listId, text })
        )}
        onCancelClick={hideModal}
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
  hideModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default connect()(CreateCardModal);
