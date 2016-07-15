import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import Loader from '../../components/Loader';
import BottomBox from '../../components/BottomBox';
import Btn from '../../components/Btn';
import BoardsGroups from '../../components/BoardsGroups';
import BoardsSpinner from '../../components/BoardsSpinner';
import { fetchBoards, fetchStarredBoards } from '../../actions/boardsActions';
import { showModal } from '../../actions/modalActions';
import { getGroups } from '../../selectors/boardsSelectors';

class IndexPage extends Component {
  componentWillMount() {
    if (this.props.shouldFetchBoards) {
      this.props.fetchBoards();
    }
    if (this.props.shouldFetchStarred) {
      this.props.fetchStarredBoards();
    }
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
    const { groups, isLoading, onAddBoardBtnClick } = this.props;

    return (
      <div>
        {isLoading ? (
          <Loader />
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
  isLoading: PropTypes.bool.isRequired,
  shouldFetchBoards: PropTypes.bool.isRequired,
  shouldFetchStarred: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { all, starred } = state.pages.main;

  return {
    groups: getGroups(state),
    shouldFetchBoards: !all.lastUpdated,
    shouldFetchStarred: !starred.lastUpdated,
    isLoading: !all.lastUpdated || !starred.lastUpdated,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
