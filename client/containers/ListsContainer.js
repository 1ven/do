import React from 'react';
import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { createList } from '../actions/listsActions';
import { addListId } from '../actions/boardsActions';

function mapStateToProps(state, ownProps) {
    const { lists } = state.entities;
    const listsIds = ownProps.listsIds || [];

    return {
        lists: listsIds.map(id => lists[id])
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const { boardId } = ownProps;
    return {
        onListCreate: title => {
            dispatch(createList(boardId, title))
                .then(action => {
                    dispatch(addListId(boardId, action.payload.result));
                });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lists);
