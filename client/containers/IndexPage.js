import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { getActivity } from '../actions/activityActions';
import { getBoards, removeBoard, updateBoard, toggleStarred } from '../actions/boardsActions';
import { startProgressBar, finishProgressBar } from '../actions/progressBarActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import BottomBox from '../components/BottomBox';
import Btn from '../components/Btn';
import Animation from '../components/Animation';
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
    const { lastUpdated, dispatch } = this.props;
    if (!lastUpdated) {
      dispatch(startProgressBar());
      dispatch(getBoards())
        .then(() => {
          dispatch(finishProgressBar());
        });
      dispatch(getActivity());
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

  handleGroupTitleClick(groupTitle, isActive) {
    const name = `${groupTitle}_accordion_hidden`;
    if (!isActive) {
      cookie.set(name, true);
    } else {
      cookie.remove(name);
    }
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
              onGroupTitleClick={this.handleGroupTitleClick}
            />
        )}
        <BottomBox
          button={addBoardBtn}
        />
        <div>
          <Animation name="a-fade-in">
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
          </Animation>
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
    groups: [
      getGroupObject('Starred boards', items.filter(b => b.starred)),
      getGroupObject('My boards', items),
    ],
    isFetching,
    lastUpdated,
  };
}

function getGroupObject(title, boards) {
  return {
    hidden: cookie.get(`${title}_accordion_hidden`),
    title,
    boards,
  };
}

export default connect(
  mapStateToProps
)(IndexPage);
