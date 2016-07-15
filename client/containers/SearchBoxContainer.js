import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import { search, resetSearch } from '../actions/searchActions';
import { getResults } from '../selectors/searchSelectors';

function mapStateToProps(state) {
  return {
    results: getResults(state),
    isWaiting: state.search.isFetching,
    query: state.search.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(query) {
      if (!query) {
        return dispatch(resetSearch());
      }
      dispatch(search.request({ query }));
    },
    onItemClick() {
      dispatch(resetSearch());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
