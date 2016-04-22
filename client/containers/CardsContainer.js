import React from 'react';
import assign from 'lodash/assign';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { createCard, removeCard } from '../actions/cardsActions';
import { addCardId, removeCardId } from '../actions/listsActions';
import { showEditForm, hideEditForm } from '../actions/editFormActions';

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const cardsIds = ownProps.cardsIds || [];
    const { editForm } = state;

    return {
        cards: cardsIds.map(id => {
            return assign({}, cards[id], {
                isEditing: editForm.id === id
            });
        })
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const { listId } = ownProps;
    return {
        // TODO: May be rename callback
        onCardCreate: text => {
            dispatch(createCard(listId, text))
                .then(action => {
                    dispatch(addCardId(listId, action.payload.result));
                });
        },
        onCardRemoveClick: id => {
            dispatch(removeCard(id))
                .then(action => {
                    dispatch(removeCardId(listId, id));
                });
        },
        onCardTextClick: id => {
            dispatch(showEditForm(id, 'card'));
        },
        onCardInputFormSubmit: (id, text) => {
            console.log(text);
            dispatch(hideEditForm());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);
