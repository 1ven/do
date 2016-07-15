import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { compose } from 'redux';
import modalsNames from '../../constants/modalsNames';
import Board from '../../components/Board';
import Loader from '../../components/Loader';
import TextInfo from '../../components/TextInfo';
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
          <TextInfo>Error loading board.</TextInfo>
        ) : isFetching || !lastUpdated ? (
          <Loader />
        ) : !board ? (
          <TextInfo>Board not found.</TextInfo>
        ) : (
          <Board
            {...board}
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
  const { isFetching, lastUpdated, error } = state.pages.board[boardId] || {};
  const board = state.entities.boards[boardId];

  return {
    board,
    isFetching,
    lastUpdated,
    error,
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

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BoardPage);
