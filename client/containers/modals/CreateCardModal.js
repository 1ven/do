import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleReduxFormSubmit } from '../../utils';
import Modal from '../../components/Modal';
import CardForm from '../forms/CardForm';
import { createCard } from '../../actions/cardsActions';
import { hideModal } from '../../actions/modalActions'; 

function CreateCardModal({ dispatch, boardId, listId }) {
  return (
    <Modal
      title="Create card"
      onClose={() => dispatch(hideModal())}
    >
      <CardForm
        onSubmit={handleReduxFormSubmit(
          dispatch, createCard.request, { boardId, listId }
        )}
        onFormBoxCancelClick={() => dispatch(hideModal())}
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
