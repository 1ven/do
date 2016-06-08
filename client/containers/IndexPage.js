import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getActivity } from '../actions/activityActions';
import { getBoards, removeBoard, updateBoard, toggleStarred } from '../actions/boardsActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import BottomBox from '../components/BottomBox';
import Btn from '../components/Btn';
import Animate from '../components/Animate';
import CreateBoardModal from './CreateBoardModal';
import EditBoardModal from './EditBoardModal';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
    };

    this.handleAddBoardBtnClick = this.handleAddBoardBtnClick.bind(this);
    this.handleBoardTileEditClick = this.handleBoardTileEditClick.bind(this);
    this.handleBoardTileRemoveClick = this.handleBoardTileRemoveClick.bind(this);
    this.handleBoardTileToggleStarredClick = this.handleBoardTileToggleStarredClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    if (!this.props.lastUpdated) {
      this.props.dispatch(getBoards());
      this.props.dispatch(getActivity());
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
  }

  handleAddBoardBtnClick() {
    this.setState({
      modal: {
        name: 'createBoard',
      },
    });
  }

  handleBoardTileEditClick(board) {
    this.setState({
      modal: {
        name: 'editBoard',
        data: board,
      },
    });
  }

  handleBoardTileRemoveClick(id) {
    this.props.dispatch(removeBoard(id));
  }

  handleBoardTileToggleStarredClick(boardId, starred) {
    this.props.dispatch(
      toggleStarred(boardId)
    );
  }

  hideModal() {
    this.setState({
      modal: null,
    });
  }

  render() {
    const {
      groups,
      isFetching,
      lastUpdated,
    } = this.props;
    const { modal } = this.state;

    const isEmpty = groups.length === 0;

    const addBoardBtn = (
      <Btn
        text="Add new board"
        onClick={this.handleAddBoardBtnClick}
      />
    );

    return (
      <div>
        {isFetching || !lastUpdated ? (
          <Loader />
          ) : isEmpty ? (
            <div>No result.</div>
          ) : (
            <BoardsList
              groups={groups}
              onBoardTileRemoveClick={this.handleBoardTileRemoveClick}
              onBoardTileEditClick={this.handleBoardTileEditClick}
              onBoardTileToggleStarredClick={this.handleBoardTileToggleStarredClick}
            />
        )}
        <BottomBox
          button={addBoardBtn}
        />
        <div>
          <Animate name="a-fade-in">
            {modal && modal.name === 'createBoard' ? (
              <CreateBoardModal
                hideModal={this.hideModal}
              />
              ) : modal && modal.name === 'editBoard' ? (
                <EditBoardModal
                  hideModal={this.hideModal}
                  board={modal.data}
                />
            ) : null}
          </Animate>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  groups: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};

function mapStateToProps(state) {
  const { boards } = state.entities;
  const { ids, isFetching, lastUpdated } = state.pages.index;
  const items = ids.map(id => {
    const board = boards[id];
    const { cardsLength, listsLength, starred } = board;
    return {
      ...board,
      cardsLength: cardsLength || 0,
      listsLength: listsLength || 0,
      starred: starred || false,
    };
  });

  return {
    groups: [{
      title: 'Starred boards',
      boards: items.filter(b => b.starred),
    }, {
      title: 'My boards',
      boards: items,
    }],
    isFetching,
    lastUpdated,
  };
}

export default connect(
  mapStateToProps
)(IndexPage);
