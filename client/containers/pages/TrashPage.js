import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Loader from '../../components/Loader';
import Trash from '../../components/Trash';
import TextInfo from '../../components/TextInfo';
import { fetchTrash, restoreEntry } from '../../actions/trashActions';

const inflect = require('i')();

class TrashPage  extends Component {
  componentWillMount() {
    this.props.fetchTrash();
  }

  componentWillReceiveProps(nextProps) {
    const nextPageIndex = nextProps.params.pageIndex;
    if (this.props.params.pageIndex !== nextPageIndex) {
      this.props.fetchTrash(nextPageIndex);
    }
  }

  render() {
    const {
      items,
      pagesLength,
      error,
      isFetching,
      lastUpdated,
      onRestoreClick,
    } = this.props;
    const isEmpty = items.length === 0;
    const pageIndex = parseInt(this.props.params.pageIndex);

    return error ? (
      <TextInfo>Error fetching trash</TextInfo>
    ) : isFetching || !lastUpdated ? (
      <Loader />
    ) : isEmpty ? (
      <TextInfo>No result.</TextInfo>
    ) : (
      <Trash
        items={items}
        pageIndex={pageIndex}
        pagesLength={pagesLength}
        onRestoreClick={onRestoreClick}
      />
    );
  }
};

TrashPage.propTypes = {
  params: PropTypes.shape({
    pageIndex: PropTypes.string.isRequired,
  }),
  items: PropTypes.array.isRequired,
  pagesLength: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  const { trash } = state.entities;
  const {
    ids,
    pagesLength,
    isFetching,
    lastUpdated,
    error
  } = state.pages.trash;
  return {
    items: ids.map(entryId => {
      const { entryTable, content, deleted } = trash[entryId];
      return {
        type: inflect.singularize(entryTable),
        date: moment.unix(deleted).format('D MMM [at] HH:mm'),
        content,
        entryId,
      };
    }),
    isFetching,
    lastUpdated,
    error,
    pagesLength,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onRestoreClick(entryId, type) {
      dispatch(
        restoreEntry.request({
          table: inflect.pluralize(type),
          entryId,
        })
      );
    },

    fetchTrash(pageIndex = ownProps.params.pageIndex) {
      dispatch(fetchTrash.request({ pageIndex }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrashPage);
