import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
/* import { startProgressBar, finishProgressBar } from '../actions/progressBarActions'; */
/* import { getBoard } from '../actions/boardsActions'; */
import Board from '../../components/Board';
import Loader from '../../components/Loader';
import CreateListModal from '../modals/CreateListModal';
import EditBoardModal from '../modals/EditBoardModal';

function loadBoard(props) {
  const { dispatch, params: { boardId } } = props;
  dispatch(startProgressBar())
  dispatch(getBoard(boardId))
    .then(() => dispatch(finishProgressBar()));
}

class BoardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
    };

    this.handleAddListBtnClick = this.handleAddListBtnClick.bind(this);
    this.handleEditBoardClick = this.handleEditBoardClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    // caching
    if (!this.props.lastUpdated) {
      loadBoard(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.boardId !== nextProps.params.boardId) {
      loadBoard(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
  }

  handleAddListBtnClick() {
    this.setState({
      modal: {
        name: 'createList',
      },
    });
  }

  handleEditBoardClick() {
    const { board } = this.props;

    this.setState({
      modal: {
        name: 'editBoard',
        data: board,
      },
    });
  }

  hideModal() {
    this.setState({ modal: null });
  }

  render() {
    const {
      board,
      isFetching,
      lastUpdated,
      children,
    } = this.props;
    const { modal } = this.state;

    return (
      <div>
        {isFetching || !lastUpdated ? (
          <Loader />
          ) : !board ? (
            <div>Board not found</div>
          ) : (
            <Board
              data={board}
              onAddListBtnClick={this.handleAddListBtnClick}
              onEditBoardClick={this.handleEditBoardClick}
            />
        )}
        {modal && modal.name === 'editBoard' ? (
          <EditBoardModal
            board={modal.data}
            hideModal={this.hideModal}
          />
          ) : modal && modal.name === 'createList' ? (
            <CreateListModal
              boardId={board.id}
              hideModal={this.hideModal}
            />
        ) : null}
        {children}
      </div>
    );
  }
}

BoardPage.propTypes = {
  board: PropTypes.object,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
  params: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const boardId = ownProps.params.boardId;
  const { isFetching, lastUpdated } = state.pages.board[boardId] || {};
  const board = state.entities.boards[boardId];

  return {
    board,
    isFetching,
    lastUpdated,
  };
}

export default connect(
  mapStateToProps
)(BoardPage);
