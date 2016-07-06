import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import Loader from '../../components/Loader';
import TextInfo from '../../components/TextInfo';
import BottomBox from '../../components/BottomBox';
import Btn from '../../components/Btn';
import BoardsGroups from '../../components/BoardsGroups';
import BoardsSpinner from '../../components/BoardsSpinner';
import { fetchBoards, fetchStarredBoards } from '../../actions/boardsActions';
import { showModal } from '../../actions/modalActions';
import { BOARDS_PER_PAGE } from '../../constants/config';

class IndexPage extends Component {
  componentWillMount() {
    if (!this.props.all.lastUpdated) {
      this.props.fetchBoards();
    }
    this.props.fetchStarredBoards();
  }

  shouldComponentUpdate(nextProps) {
    return !(!this.props.all.isFetching && !this.props.all.lastUpdated && nextProps.all.isFetching);
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
    const { groups, all, starred, onAddBoardBtnClick } = this.props;

    const isError = (all.error && !all.lastUpdated) || (starred.error && !starred.lastUpdated);
    const isLoading = !all.lastUpdated || !starred.lastUpdated;
    const isFetchingNextPage = all.isFetching && all.lastUpdated;

    return (
      <div>
        {isError ? (
          <TextInfo>Error loading boards.</TextInfo>
        ) : isLoading ? (
          <Loader />
        ) : (
          <BoardsGroups
            groups={groups}
            onGroupTitleClick={this.handleGroupTitleClick}
          />
        )}
        {isFetchingNextPage ? (
          <BoardsSpinner />
        ) : <div />}
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
  all: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    error: PropTypes.bool,
  }),
  starred: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    error: PropTypes.bool,
  }),
};

function mapStateToProps(state) {
  const { boards } = state.entities;
  const { all, starred } = state.pages.main;

  const starredIds = starred.ids;
  const boardsIds = all.ids.filter((id, i) => i < all.pageIndex * BOARDS_PER_PAGE);

  return {
    groups: [
      getGroupObject('Starred boards', starredIds),
      getGroupObject('My boards', boardsIds, all.count),
    ],
    all,
    starred,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBoards() {
      dispatch(fetchBoards.request({
        pageIndex: 1,
      }));
    },

    fetchStarredBoards() {
      dispatch(fetchStarredBoards.request());
    },

    onAddBoardBtnClick() {
      dispatch(
        showModal(modalsNames.CREATE_BOARD)
      );
    },
  };
}

function getGroupObject(title, ids, count) {
  return {
    hidden: cookie.get(`${title}_accordion_hidden`),
    title,
    ids,
    count,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
