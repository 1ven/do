import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createComment } from '../actions/commentsActions';
import FullCard from '../components/FullCard';
import Modal from '../components/Modal';
import {
  updateCard,
  getCard,
  addCommentId,
  addColor,
  removeColor,
} from '../actions/cardsActions';

class FullCardModal extends Component {
  componentWillMount() {
    this.props.loadCard();

    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    const { boardId } = this.props.params;
    browserHistory.push(`/boards/${boardId}`);
  }

  render() {
    const {
      card,
      onEditCardFormSubmit,
      onSendCommentSubmit,
      onColorClick,
    } = this.props;

    return card ? (
      <Modal
        title="Card"
        hideModal={this.hideModal}
      >
        <FullCard
          card={card}
          onEditCardFormSubmit={onEditCardFormSubmit}
          onSendCommentSubmit={onSendCommentSubmit}
          onColorClick={onColorClick}
        />
      </Modal>
    ) : null;
  }
}

function mapStateToProps(state, ownProps) {
  const { cards, comments, users } = state.entities;
  let card = cards[ownProps.params.cardId];

  card = card ? {
    ...card,
    comments: map(card.comments, id => {
      const comment = comments[id];
      return {
        ...comment,
        user: users[comment.user],
      };
    }),
  } : null;

  return {
    card,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const cardId = ownProps.params.cardId;
  return {
    onEditCardFormSubmit(formData) {
      return dispatch(updateCard(cardId, {
        text: formData.text,
      }));
    },

    onSendCommentSubmit(formData) {
      return dispatch(createComment(cardId, formData.text))
        .then(action => {
          if (!action.payload.error) {
            dispatch(addCommentId(cardId, action.payload.result));
          }
        });
    },

    onColorClick(colorId, active) {
      if (active) {
        dispatch(addColor(cardId, colorId));
      } else {
        dispatch(removeColor(cardId, colorId));
      }
    },

    loadCard() {
      return dispatch(getCard(cardId));
    },
  };
}

FullCardModal.propTypes = {
  onEditCardFormSubmit: PropTypes.func.isRequired,
  onSendCommentSubmit: PropTypes.func.isRequired,
  loadCard: PropTypes.func.isRequired,
  card: PropTypes.object,
  params: PropTypes.shape({
    id: PropTypes.string,
    boardId: PropTypes.string,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullCardModal);
