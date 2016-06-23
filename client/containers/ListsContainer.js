import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import modalsNames from '../constants/modalsNames';
import Lists from '../components/Lists';
import { removeList } from '../actions/listsActions';
import { showModal } from '../actions/modalActions';

function mapStateToProps(state, ownProps) {
  const { lists } = state.entities;
  const listsIds = ownProps.lists || [];

  return {
    lists: listsIds.map(id => lists[id]),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onListEditClick(listId) {
      dispatch(
        showModal(modalsNames.EDIT_LIST, { listId })
      );
    },

    onListRemoveClick(listId) {
      dispatch(removeList.request({
        boardId: ownProps.boardId,
        listId,
      }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
