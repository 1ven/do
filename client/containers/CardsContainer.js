import React from 'react';
import assign from 'lodash/assign';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { createCard, removeCard, updateCard } from '../actions/cardsActions';
import { addCardId, removeCardId } from '../actions/listsActions';
import { showEditForm, hideEditForm } from '../actions/editFormActions';
import { showModal, hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const cardsIds = ownProps.cards || [];
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

    const handleModalFormSubmit = formData => {
        dispatch(createCard(listId, formData.text))
            .then(action => {
                if (!action.error) {
                    dispatch(addCardId(listId, action.payload.result));
                    dispatch(hideModal());
                }
            });
    };

    return {
        onAddCardBtnClick: () => {
            dispatch(showModal(
                'Create card',
                <ModalForm
                    rows={[
                        <Input
                            name="text"
                            placeholder="Text"
                            focus={true}
                        />
                    ]}
                    onSubmit={handleModalFormSubmit}
                    onCancelClick={() => dispatch(hideModal())}
                />
            ));
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
            dispatch(updateCard(id, { text }))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(hideEditForm());
                    }
                });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);
