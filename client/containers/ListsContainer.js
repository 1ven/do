import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import modalsNames from '../constants/modalsNames';
import Lists from '../components/Lists';
import { removeList } from '../actions/listsActions';
import { showModal } from '../actions/modalActions';

class ListsContainer extends Component {
  constructor(props) {
    super(props);

    this.handleEditListClick = this.handleEditListClick.bind(this);
    this.handleListRemoveClick = this.handleListRemoveClick.bind(this);
  }

  handleEditListClick(list) {
    this.props.dispatch(
      showModal(modalsNames.EDIT_LIST, { list })
    );
  }

  handleListRemoveClick(listId) {
    this.props.dispatch(removeList.request({
      boardId: this.props.boardId,
      listId,
    }));
  }

  render() {
    const { lists, boardId } = this.props;
    return (
      <div>
        <Lists
          onListRemoveClick={this.handleListRemoveClick}
          onListEditClick={this.handleEditListClick}
          lists={lists}
          boardId={boardId}
        />
      </div>
    );
  }
}

ListsContainer.propTypes = {
  lists: PropTypes.array.isRequired,
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { lists } = state.entities;
  const listsIds = ownProps.lists || [];

  return {
    lists: listsIds.map(id => lists[id]),
  };
}

export default connect(
  mapStateToProps
)(ListsContainer);
