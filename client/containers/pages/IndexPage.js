import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import BoardsList from '../../components/BoardsList.js';
import Loader from '../../components/Loader';
import BottomBox from '../../components/BottomBox';
import Btn from '../../components/Btn';
import Animation from '../../components/Animation';
import { fetchBoards, removeBoard, updateBoard } from '../../actions/boardsActions';
import { showModal } from '../../actions/modalActions';

class IndexPage extends Component {
  componentWillMount() {
    this.props.fetchBoards();
  }

  shouldComponentUpdate(nextProps) {
    return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
  }

  handleGroupTitleClick(groupTitle, isActive) {
    const name = `${groupTitle}_accordion_hidden`;
    if (!isActive) {
      cookie.set(name, true);
    } else {
      cookie.remove(name);
    }
  }

  render() {
    const {
      groups,
      isFetching,
      lastUpdated,
      error,
      onBoardTileRemoveClick,
      onBoardTileEditClick,
      onBoardTileToggleStarredClick,
      onAddBoardBtnClick,
    } = this.props;

    const isEmpty = groups.length === 0;

    return (
      <div>
        {error ? (
          <div>Error loading boards.</div>
        ) : isEmpty ? (
          <div>No result.</div>
        ) : isFetching || !lastUpdated ? (
          <Loader />
        ) : (
          <BoardsList
            groups={groups}
            onBoardTileRemoveClick={onBoardTileRemoveClick}
            onBoardTileEditClick={onBoardTileEditClick}
            onBoardTileToggleStarredClick={onBoardTileToggleStarredClick}
            onGroupTitleClick={this.handleGroupTitleClick}
          />
        )}
        <BottomBox
          button={
            <Btn
              text="Add new board"
              onClick={onAddBoardBtnClick}
            />
          }
        />
      </div>
    );
  }
}

IndexPage.propTypes = {
  groups: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  error: PropTypes.bool,
};

function mapStateToProps(state) {
  const { boards } = state.entities;
  const { ids, isFetching, lastUpdated, error } = state.pages.main;
  const items = ids.map(id => boards[id]);

  return {
    groups: [
      getGroupObject('Starred boards', items.filter(b => b.starred)),
      getGroupObject('My boards', items),
    ],
    isFetching,
    lastUpdated,
    error,
  };
}

function getGroupObject(title, boards) {
  return {
    hidden: cookie.get(`${title}_accordion_hidden`),
    title,
    boards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBoards() {
      dispatch(fetchBoards.request());
    },

    onAddBoardBtnClick() {
      dispatch(
        showModal(modalsNames.CREATE_BOARD)
      );
    },

    onBoardTileEditClick(boardId) {
      dispatch(
        showModal(modalsNames.EDIT_BOARD, {
          boardId,
        })
      );
    },

    onBoardTileRemoveClick(id) {
      dispatch(removeBoard.request({ id }));
    },

    onBoardTileToggleStarredClick(id, starred) {
      dispatch(
        updateBoard.request({
          id,
          props: {
            starred: !starred
          }
        })
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
