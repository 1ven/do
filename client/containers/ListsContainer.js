import React from 'react';
import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { removeList } from '../actions/listsActions';
import { removeListId } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import EditListModal from './EditListModal';

function mapStateToProps(state, ownProps) {
    const { lists } = state.entities;
    const listsIds = ownProps.lists || [];

    return {
        lists: listsIds.map(id => lists[id])
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onListRemoveClick: id => {
            dispatch(removeList(id))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(removeListId(ownProps.boardId, id));
                    }
                });
        },
        onListEditClick: list => {
            dispatch(showModal(
                'Edit list',
                <EditListModal list={list} />
            ));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lists);
