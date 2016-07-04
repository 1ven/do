import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import Loader from '../../components/Loader';
import TextInfo from '../../components/TextInfo';
import BottomBox from '../../components/BottomBox';
import Btn from '../../components/Btn';
import BoardsGroups from '../../components/BoardsGroups';
import { fetchBoards } from '../../actions/boardsActions';
import { showModal } from '../../actions/modalActions';
import { BOARDS_PER_PAGE } from '../../constants/config';

class IndexPage extends Component {
  componentWillMount() {
    if (!this.props.lastUpdated) {
      this.props.fetchBoards();
    }
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
      onAddBoardBtnClick,
    } = this.props;

    const isEmpty = groups.length === 0;

    return (
      <div>
        {error ? (
          <TextInfo>Error loading boards.</TextInfo>
        ) : isFetching || !lastUpdated ? (
          <Loader />
        ) : isEmpty ? (
          <TextInfo>No result.</TextInfo>
        ) : (
          <BoardsGroups
            groups={groups}
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
  const { ids, pageIndex, isFetching, lastUpdated, error } = state.pages.main;

  const starredIds = ids.filter(id => boards[id].starred);
  const boardsIds = ids.filter((id, i) => i < pageIndex * BOARDS_PER_PAGE);

  return {
    groups: [
      getGroupObject('Starred boards', starredIds),
      getGroupObject('My boards', boardsIds),
    ],
    isFetching,
    lastUpdated,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBoards() {
      dispatch(fetchBoards.request({
        pageIndex: 1,
      }));
    },

    onAddBoardBtnClick() {
      dispatch(
        showModal(modalsNames.CREATE_BOARD)
      );
    },
  };
}

function getGroupObject(title, ids) {
  return {
    hidden: cookie.get(`${title}_accordion_hidden`),
    title,
    ids,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
