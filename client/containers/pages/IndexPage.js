import React, { PropTypes, Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import modalsNames from '../../constants/modalsNames';
import Loader from '../../components/Loader';
import BottomBox from '../../components/BottomBox';
import Btn from '../../components/Btn';
import BoardsGroups from '../../components/BoardsGroups';
import { fetchBoards } from '../../actions/boardsActions';
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
  const { ids, isFetching, lastUpdated, error } = state.pages.main;
  const starredIds = ids.filter(id => boards[id].starred);

  return {
    groups: [
      getGroupObject('Starred boards', starredIds),
      getGroupObject('My boards', ids),
    ],
    isFetching,
    lastUpdated,
    error,
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
