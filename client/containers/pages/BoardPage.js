import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import Board from '../../components/Board';
import Loader from '../../components/Loader';
import { fetchBoard } from '../../actions/boardsActions';
import { showModal } from '../../actions/modalActions';

class BoardPage extends Component {
  componentWillMount() {
    const { loadBoard, lastUpdated, params: { boardId } } = this.props;
    if (!lastUpdated) {
      loadBoard(boardId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.boardId !== nextProps.params.boardId) {
      this.props.loadBoard(nextProps.params.boardId);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
  }

  render() {
    const {
      board,
      isFetching,
      lastUpdated,
      error,
      children,
      onAddListBtnClick,
      onEditBoardClick,
    } = this.props;

    return (
      <div>
        {error ? (
          <div>Error loading board.</div>
        ) : isFetching || !lastUpdated ? (
        <Loader />
        ) : !board ? (
          <div>Board not found.</div>
        ) : (
          <Board
            data={board}
            onAddListBtnClick={onAddListBtnClick}
            onEditBoardClick={onEditBoardClick}
          />
        )}
        {children}
      </div>
    );
  }
}

BoardPage.propTypes = {
  board: PropTypes.object,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  children: PropTypes.node,
  params: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { boardId } = ownProps.params;
  const { isFetching, lastUpdated } = state.pages.board[boardId] || {};
  const board = state.entities.boards[boardId];

  return {
    board,
    isFetching,
    lastUpdated,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadBoard(id) {
      dispatch(fetchBoard.request({ id }));
    },

    onAddListBtnClick() {
      dispatch(
        showModal(modalsNames.CREATE_LIST, {
          boardId: ownProps.params.boardId,
        })
      );
    },

    onEditBoardClick() {
      dispatch(
        showModal(modalsNames.EDIT_BOARD, {
          boardId: ownProps.params.boardId,
        })
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
