import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import modalsNames from '../constants/modalsNames';
import Cards from '../components/Cards';
import { removeCard, moveCardSync } from '../actions/cardsActions';
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

    onMoveCard(source, target) {
      dispatch(
        moveCardSync(source, target)
      );
    },

    onDropCard(source, target) {},
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Cards);
