import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTrash, restore } from '../actions/trashActions';
import Loader from '../components/Loader';
import Trash from '../components/Trash';

const inflect = require('i')();

class TrashPage  extends Component {
  constructor(props) {
    super(props);

    this.handleRestoreClick = this.handleRestoreClick.bind(this);
  }

  componentWillMount() {
    const { lastUpdated, dispatch } = this.props;
    if (!lastUpdated) {
      dispatch(getTrash(1));
    }
  }

  handleRestoreClick(entryId, type) {
    const table = inflect.pluralize(type);
    this.props.dispatch(
      restore(entryId, table)
    );
  }

  render() {
    const {
      items,
      pagesLength,
      error,
      isFetching,
      lastUpdated,
    } = this.props;
    const isEmpty = items.length === 0;
    const pageIndex = parseInt(this.props.params.pageIndex);

    return error ? (
      <div>Error fetching trash</div>
    ) : isFetching || !lastUpdated ? (
      <Loader />
    ) : isEmpty ? (
      <div>No result.</div>
    ) : (
      <Trash
        items={items}
        pageIndex={pageIndex}
        pagesLength={pagesLength}
        onRestoreClick={this.handleRestoreClick}
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
  dispatch: PropTypes.func.isRequired,
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

export default connect(
  mapStateToProps
)(TrashPage);
