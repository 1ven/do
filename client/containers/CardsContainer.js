import React from 'react';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { createCard, removeCard } from '../actions/cardsActions';
import { addCardId, removeCardId } from '../actions/listsActions';

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const cardsIds = ownProps.cardsIds || [];

    return {
        cards: cardsIds.map(id => cards[id]),
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const { listId } = ownProps;
    return {
        onCardCreate: text => {
            dispatch(createCard(listId, text))
                .then(action => {
                    dispatch(addCardId(listId, action.payload.result));
                });
        },
        onCardRemoveClick: id => {
            dispatch(removeCard(id))
                .then(action => {
                    dispatch(removeCardId(listId, action.payload.result.id));
                });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);
