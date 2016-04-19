import React from 'react';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { createCard } from '../actions/cardsActions';
import { addCardId } from '../actions/listsActions';

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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);
