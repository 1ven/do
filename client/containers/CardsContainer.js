import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import modalsNames from '../constants/modalsNames';
import Cards from '../components/Cards';
import { removeCard, moveCard, moveCardSync, beginDrag, endDrag } from '../actions/cardsActions';
import { showModal } from '../actions/modalActions';

function mapStateToProps(state, ownProps) {
  const { cards } = state.entities;
  const cardsIds = ownProps.cardsIds || [];

  return {
    cards: cardsIds.map(cardId => {
      const card = cards[cardId];
      const colors = card.colors.filter(c => c.active).map(c => c.color);
      return {
        ...pick(card, ['id', 'text', 'link']),
        colors,
      };
    }),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onCardRemoveClick(cardId) {
      dispatch(removeCard(cardId));
    },

    onAddCardBtnClick() {
      dispatch(
        showModal(modalsNames.CREATE_CARD, {
          boardId: ownProps.boardId,
          listId: ownProps.listId,
        })
      );
    },

    onCardMove(source, target) {
      dispatch(
        moveCardSync(source, target)
      );
    },

    onCardEndDrag(sourceListId, targetListId) {
      dispatch(
        moveCard.request({ sourceListId, targetListId })
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
