import React from 'react';
import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { removeList, updateList } from '../actions/listsActions';
import { removeListId } from '../actions/boardsActions';
import { showModal, hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

function mapStateToProps(state, ownProps) {
    const { lists } = state.entities;
    const listsIds = ownProps.listsIds || [];

    return {
        lists: listsIds.map(id => lists[id])
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const { boardId } = ownProps;
    const handleEditFormSubmit = (listId, formData) => {
        dispatch(updateList(listId, formData))
            .then(action => {
                if (!action.payload.error) {
                    dispatch(hideModal());
                }
            });
    };

    return {
        onListRemoveClick: id => {
            dispatch(removeList(id))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(removeListId(boardId, id));
                    }
                });
        },
        onListEditClick: list => {
            dispatch(showModal(
                'Edit list',
                <ModalForm
                    rows={[
                        <Input
                            name="title"
                            placeholder="Title"
                            value={list.title}
                            focus={true}
                        />
                    ]}
                    onSubmit={formData => handleEditFormSubmit(list.id, formData)}
                    onCancelClick={() => dispatch(hideModal())}
                />
            ));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lists);
