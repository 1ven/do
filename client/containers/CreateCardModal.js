import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCardId } from '../actions/listsActions';
import { createCard } from '../actions/cardsActions';
import { incCardsLength } from '../actions/boardsActions';
import { createNotificationWithTimeout } from '../actions/notificationsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

function CreateCardModal({ hideModal, dispatch, listId }) {
  function handleSuccess(payload) {
    const cardId = payload.result;
    const { boardId } = payload.entities.cards[cardId];
    dispatch(addCardId(listId, cardId));
    dispatch(incCardsLength(boardId));
    hideModal();
    dispatch(createNotificationWithTimeout(
      'Card was successfully created',
      'info'
    ));
  }

  return (
    <Modal
      title="Create card"
      hideModal={hideModal}
    >
      <FormBox
        request={({ text }) => dispatch(createCard(listId, text))}
        onCancelClick={hideModal}
        onSuccess={handleSuccess}
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
};

export default connect()(CreateCardModal);
