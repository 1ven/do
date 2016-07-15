import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import modalsNames from '../../constants/modalsNames';
import map from 'lodash/map';
import { connect } from 'react-redux';
import FullCard from '../../components/FullCard';
import Modal from '../../components/Modal';
import { updateCard, fetchCard, addColor, removeColor } from '../../actions/cardsActions';
import { createComment, removeComment } from '../../actions/commentsActions';
import { showModal } from '../../actions/modalActions';

class FullCardModal extends Component {
  componentWillMount() {
    if (!this.props.lastUpdated) {
      this.props.loadCard();
    }
  }

  render() {
    const {
      card,
      isFetching,
      lastUpdated,
      error,
      onEditCardFormSubmit,
      onSendCommentSubmit,
      onRemoveCommentClick,
      onColorClick,
      params: {
        boardId,
      },
    } = this.props;

    return card ? (
      <Modal
        title="Card"
        isWaiting={isFetching || !lastUpdated}
        onClose={() => browserHistory.push(`/boards/${boardId}`)}
      >
        <FullCard
          card={card}
          onEditCardFormSubmit={onEditCardFormSubmit}
          onSendCommentSubmit={onSendCommentSubmit}
          onRemoveCommentClick={onRemoveCommentClick}
          onColorClick={onColorClick}
        />
      </Modal>
    ) : null;
  }
}

function mapStateToProps(state, ownProps) {
  const { cards, comments, users } = state.entities;
  const { boardId, cardId } = ownProps.params;
  const boardPage = state.pages.board[boardId] || {};
  const cardsModals = boardPage.cards || {};
  const { isFetching, lastUpdated, error } = cardsModals[cardId] || {};
  let card = cards[cardId];

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
    isFetching,
    error,
    lastUpdated,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { boardId, cardId } = ownProps.params;
  return {
    onEditCardFormSubmit(formData) {
      return dispatch(updateCard.request({
        id: cardId,
        props: {
          text: formData.text,
        },
      }));
    },

    onSendCommentSubmit(formData) {
      return dispatch(
        createComment.request({ cardId, text: formData.text })
      );
    },

    onColorClick(colorId, active) {
      if (active) {
        dispatch(addColor.request({ cardId, colorId }));
      } else {
        dispatch(removeColor.request({ cardId, colorId }));
      }
    },

    onRemoveCommentClick(cardId, commentId) {
      dispatch(
        showModal(modalsNames.CONFIRM, {
          title: 'Remove comment?',
          onConfirm() {
            dispatch(removeComment.request({ cardId, commentId }));
          },
        })
      );
    },

    loadCard() {
      return dispatch(fetchCard.request({ boardId, cardId }));
    },
  };
}

FullCardModal.propTypes = {
  onEditCardFormSubmit: PropTypes.func.isRequired,
  onSendCommentSubmit: PropTypes.func.isRequired,
  loadCard: PropTypes.func.isRequired,
  card: PropTypes.object,
  params: PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullCardModal);
